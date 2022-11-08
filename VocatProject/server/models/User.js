const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
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
    wordsLearned: {
        type: String,
        required: false,
    }
})

// create mongoose Model
const User = mongoose.model("User", userSchema)

// export the model so we can import it in app.js
module.exports = {
    User,
}