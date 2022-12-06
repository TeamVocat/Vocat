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
    wordBankProgress: {
        type: Number,
        required: false,
        default: 0,
    },
    lastLogInDate: {
        type: [String],
        required: false,
        default: [],
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
        type: [mongoose.Schema.Types.ObjectId],
        ref: "VocabWord",
        default: null,
    },
    reviewToday: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "VocabWord",
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
