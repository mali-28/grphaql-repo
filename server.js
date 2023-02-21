import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { users, quotes} from "./db.js";
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

`

const resolvers = {
  Query: {
    greet: () => "Hello world",
    users: () => users,
    user: (_,{id}) => users.find((currUser=> currUser.id === id)),
    quotes: () => quotes
  },
  // parent -->  in this case User
  User: {
    quotes: (parent) => quotes.filter((elem) => elem.by == parent.id)
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground()
  ]
})

server.listen().then(({ url })=> {
  console.log(`Server ready at ${url}`)
})