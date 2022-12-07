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
        type: [{
            word: String,
            definition: String,
            part_of_speech: String,
            example: String
        }],
        required: true,
        default: [{
            word: "null",
            definition: "null",
            part_of_speech: "null",
            example: "null",
        }]
    },
    wordBankProgress: {
        type: Number,
        required: true,
        default: 0,
    },
    lastLogInDate: {
        type: [{
            dateString: String,
            numWords: Number
        }],
        required: true,
        default: []
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
    },
    wordsToday: {
        type: [{
            word: String,
            definition: String,
            part_of_speech: String,
            example: String
        }],
        default: [],
    },
    reviewToday: {
        type: [{
            word: String,
            definition: String,
            part_of_speech: String,
            example: String
        }],
        default: [],
    },
    doneLearningToday: {
        type: Boolean,
        default: false,
    },
})

// create mongoose Model
const User = mongoose.model("User", userSchema)

// export the model so we can import it in app.js
module.exports = {
    User,
}
