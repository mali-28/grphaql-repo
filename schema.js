import { gql } from "apollo-server";

const typeDefs = gql`
  type Query{
    greet: String,
    users: [User]
    user(id:ID!): User
    quotes: [Quote]
  }
  
  type User{
    id: ID!
    firstName: String
    lastName: String
    email: String
    quotes: [Quote]
  }
  type Quote{
    name: String
    by: ID
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!) : User
  }

`
export default typeDefs