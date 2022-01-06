const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Category {
        _id: ID
        name: String
        services: []
        products: []
    }

    type Product {
        _id: ID
        name: String
        category: Category
    }

    type User {
        _id: ID
        username: String
        firstName: String
        lastName: String
        email: String
    }

    type Order {
        _id: ID
        date: Date 
        products: []
        status: String
    }

    type Service {
        _id: ID
        name: String
        category: Category
        date: Date,
        seller: User
    }

    type Checkout {
        session: ID
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        categories: [Category]
        
        products( category: ID, name: String ): [Product]

        product( _id: ID! ): Product
        
        user: User
        
        order:( _id: ID! ): Order
        
        checkout( products: [ID]! ): Checkout
    }

    type Mutation {
        addUser( firstName: String!, lastName: String!, email: String!, password: String! ): Auth
        
        addOrder( products: [ID]! ): Order
        
        updateUser( firstName: String, lastName: String, email: String,password: String! ): Auth
        
        updatePrduct( _id: ID!, quantity: Int! ): Product
        
        login( email: String!, password: String! ): Auth
    }


`;

module.exports = typeDefs;