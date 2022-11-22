const mongoose = require("mongoose")
const Schema = mongoose.Schema
mongoose.pluralize(null);

const vocabWordSchema = new Schema({
    word: {
        type: String,
        required: true,
    },
    definition: {
        type: String,
        required: true,
    },
    part_of_speech: {
        type: String,
        required: true,
    },
    example: {
        type: String,
        required: true,
    },
    learnedUsers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        required: false,
    }
})

// create mongoose Model
const EnglishVocabWord = mongoose.model("englishvocab", vocabWordSchema)

// export the model so we can import it in app.js
module.exports = {
    EnglishVocabWord,
}