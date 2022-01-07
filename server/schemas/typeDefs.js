const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Category {
        _id: ID
        name: String
    }

    type Product {
        _id: ID
        name: String
        description: String
        image: String
        quantity: Int
        price: Float
        category: Category
    }

    type User {
        _id: ID
        username: String
        firstName: String
        lastName: String
        email: String
        orders: [Order]
    }

    type Order {
        _id: ID
        orderDate: String 
        products: [Product]
        status: String
    }

    type Service {
        _id: ID
        name: String
        category: Category
        date: String,
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
        products(category: ID, name: String): [Product]
        product(_id: ID!): Product
        user: User
        users: [User]
        order(_id: ID!): Order
        checkout(products: [ID]!): Checkout
    }

    type Mutation {
        addUser(username: String!, firstName: String!, lastName: String!, email: String!, password: String!): Auth
        
        addUserTester(username: String!, firstName: String!, lastName: String!, email: String!, password: String!): User

        addOrder(products: [ID]!): Order

        addOrderTester(products: [ID]!, user_id: [ID]!): Order
        
        updateUser(firstName: String, lastName: String, email: String,password: String!): User
        
        updateProduct(_id: ID!, quantity: Int!): Product
        
        login(email: String!, password: String!): Auth
    }

`;

module.exports = typeDefs;