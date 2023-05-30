const  { ApolloServer, gql }  =require("apollo-server");
const  { ApolloServerPluginLandingPageGraphQLPlayground } =  require("apollo-server-core");
const resolvers =  require("./resolvers");
const typeDefs = require("./schema");
const mongoose  = require("mongoose");
const { MONGODB_URI, JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");
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
  context: ({ req }) => {
    const { authorization } = req.headers
    if (authorization) {
      const { userId } = jwt.verify(authorization, JWT_SECRET)
      return {userId}
    }
  },
  plugins: [
    // ApolloServerPluginLandingPageGraphQLPlayground()
  ]
})

server.listen().then(({ url })=> {
  console.log(`Server ready at ${url}`)
})