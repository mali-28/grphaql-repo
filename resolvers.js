const mongoose = require("mongoose");
const { users, quotes } = require("./db");
const bcrypt  = require("bcryptjs");
const User  = require("./model/User");
const jwt  = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const resolvers = {
    Query: {
      greet: () => "Hello world",
      users: () => users,
      user: (_,{_id}) => users.find((currUser=> currUser._id === _id)),
      quotes: () => quotes
    },
    // parent -->  in this case User
    User: {
      quotes: (parent) => quotes.filter((elem) => elem.by == parent._id)
    },
    Mutation: {
      createUser: async (_, {newUser} ) => {
        const user = await User.findOne({ email: newUser.email })
        if (user) {
          throw new Error("User already exists with that email")
        }
        const hashedPassword = await bcrypt.hash(newUser.password, 12)
        const createUser = new  User({
          ...newUser, password: hashedPassword
        })
        return await createUser.save()
      },

      loginUser: async (_, { LoginInput }) => {
        const user = await User.findOne({ email: LoginInput.email })
        if (!user) {
          throw new Error("User doesnot exists")
        }
        const isPassswordMatch = await bcrypt.compare(LoginInput.password, user.password)
        if (!isPassswordMatch) throw new Error("Email or password invalid")
        
        const token = jwt.sign({ userId: user._id }, JWT_SECRET)
        return {token}

      }
    }
}

module.exports = resolvers;