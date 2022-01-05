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

    }

    type Mutation {
        login(email: String!, password: String!): Auth
    }


`;

module.exports = typeDefs;