const { AuthenticationError } = require('apollo-server-express');
const { use } = require('bcrypt/promises');
const { Category, User, Order, Product } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },

        products: async ( parent, { category, name } ) => {
            const params = {};

            if ( category ) {
                params.category = category;
            }

            if ( name ) {
                params.name = {
                    $regex: name
                }
            }

            return await Product.find( params ).populate( 'category' );
        },

        users: async () => {
            return await User.find().populate([
                { path: 'orders.products' }
            ]);
        },

        product: async ( _id ) => { 
            return await Product.find( _id ).populate( 'category' );
        },

        user: async (parent, args, context ) => {
            if ( context.user ) {

                // Returns the current logged in user from the database along with their orders, products in their orders, and the categories of each of the products they ordered
                const user = await User.findById( context.user._id ).populate({
                    path: 'orders.products',
                    populate: 'category'
                });

                user.orders.sort( (a, b) => b.date - a.date );

                return user;
            }

            throw new AuthenticationError( 'Not logged in' );
        },

        order: async ( _id ) => {
            return await Order.find( _id );
        },

        checkout: async ( parent, args, context ) => {
            const url = new URL( context.headers.referer ).origin;
            const order = new Order({ products: args.products });
            const line_items = [];

            const { products } = await order.populate('products').execPopulate();

            for ( let i = 0; i < products.length; i++ )
            {
                const product = await stripe.products.create({
                    name: products[i].name,
                    description: products[i].description,
                    images: [`${url}/images/${products[i].images}`]
                })

                const price = await stripe.prices.create({
                    product: product.id,
                    unit_amount: products[i].price * 100,
                    currency: 'usd',
                })

                line_items.push({
                    price: price.id,
                    quantity: 1
                })
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            })

            return { session: session.id };
        }
    },

    Mutation: {
        addUser: async ( parent, args ) => {
            const user = await User.create( args );
            const token = signToken( user );

            return { token, user };
        },

        addUserTester: async ( parent, args ) => {
            const user = await User.create( args );

            return user;
        },

        addOrder: async ( parent, { products }, context ) => {
            if ( context.user ) {
                const order = new Order( { products } );

                // Passing context.user._id as the argument for the parent parameter of the User.findByIdAndUpdate function so that it can have access to context.user._id
                await User.findByIdAndUpdate( context.user._id, { $push: { orders: order } } );

                return order;
            }

            throw new AuthenticationError( 'Not logged in' );
        },

        addOrderTester: async ( parent, { products, user_id } ) => {
            let order = await Order.create( { products } );

            await User.findByIdAndUpdate( user_id, { $push: { orders: order } } );

            order = await Order.findOne( { _id: order._id } ).populate('products');

            return order;
        },

        // A resolver to add to the current user an attribute called "new" and set its value to be "true"
        updateUser: async ( parent, args, context ) => {
            if ( context.user ) {
                return await User.findByIdAndUpdate( context.user._id, args, { new: true } );
            }

            throw new AuthenticationError( 'Not logged in' );
        },

        updateProduct: async ( parent, { _id, quantity } ) => {
            const decrement = Math.abs( quantity ) * -1;

            return await Product,findByIdAndUpdate( _id, { $inc: { quantity: decrement } }, { new: true } );
        },

        login: async (parent, { email, password } ) => {
            const user = await User.findOne( email );

            if ( !user ) {
                throw new AuthenticationError( 'Incorrect credentials' );
            }

            const correctPw = await user.isCorrectPassword( password );

            if ( !correctPw ) {
                throw new AuthenticationError( 'Incorrect credentials' );
            }

            const token = signToken( user );

            return { token, user };
        } 
    }
};

module.exports = resolvers;
