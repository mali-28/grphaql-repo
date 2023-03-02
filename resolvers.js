import { users, quotes } from "./db.js";
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
    },
    Mutation: {
      createUser: (_, { firstName, lastName, email, password }) => {
            const id = email + Math.ceil(Math.random()*2*Math.random())
            users.push({
                id,
                firstName,
                lastName,
                email,
                password
            })
            return users.find((user)=> user.id == id)
        }
    }
}

export default resolvers;