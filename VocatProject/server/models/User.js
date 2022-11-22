const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    // profileImage: {
    //   type: Number,
    //
    // },
    email: {
        type: String,
        required: true,
    },
    joinDate: {
        type: String,
        required: true,
    },
    currentWordList: {
        type: String,
        required: false,
    },
    themeColor: {
      type: Number,
      required: false,
    },
    coins: {
      type: Number,
      required: true,
    }
})

// create mongoose Model
const User = mongoose.model("User", userSchema)

// export the model so we can import it in app.js
module.exports = {
    User,
}
