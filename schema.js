const { gql }  = require("apollo-server");

const typeDefs = gql`
  type Query{
    greet: String,
    users: [User]
    user(_id:ID!): User
    quotes: [Quote]
  }
  
  type User{
    _id: ID!
    firstName: String
    lastName: String
    email: String
    quotes: [Quote]
  }
  type Quote{
    name: String
    by: ID
  }

  type Token {
    token: String
  }

  type Mutation {
    createUser( newUser: UserInput!) : User
    loginUser(LoginInput: LoginInput!): Token
    createQuote(name: String): String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

`
module.exports = typeDefs