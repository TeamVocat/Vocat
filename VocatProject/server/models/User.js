const mongoose = require("mongoose")
const Schema = mongoose.Schema
mongoose.pluralize(null);

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
    wordBank: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "VocabWord",
        required: false,
    },
    lastLogInDate: {
        type: String,
        required: false,
    },
    studiedWordsNum: {
        type: Number,
        required: false,
    },
    coinNum: {
        type: Number,
        required: true,
        default: 0,
    },
    foods: {
        type: [Number],
        required: true,
        default: [0, 0, 0, 0, 0, 0]
    },
    toys: {
        type: [Number],
        required: true,
        default: [0, 0, 0, 0, 0, 0]
    },
    wordsPerDay: {
        type: Number,
        required: true,
        default: 5,
    }
})

// create mongoose Model
const User = mongoose.model("User", userSchema)

// export the model so we can import it in app.js
module.exports = {
    User,
}