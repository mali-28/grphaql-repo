const  { ApolloServer, gql }  =require("apollo-server");
const  { ApolloServerPluginLandingPageGraphQLPlayground } =  require("apollo-server-core");
const resolvers =  require("./resolvers");
const typeDefs = require("./schema");
const mongoose  = require("mongoose");
const { MONGODB_URI } = require("./config");
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb")
})
mongoose.connection.on("error", (err) => {
  console.log("error connecting", err)
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    // ApolloServerPluginLandingPageGraphQLPlayground()
  ]
})

server.listen().then(({ url })=> {
  console.log(`Server ready at ${url}`)
})