const mongoose = require("mongoose")
const Schema = mongoose.Schema

const vocabWordSchema = new Schema({
    word: {
        type: String,
        required: true,
    },
    definition: {
        type: String,
        required: true,
    },
    pronunciation: {
        type: String,
        required: true,
    }
})

// create mongoose Model
const VocabWord = mongoose.model("VocabWord", vocabWordSchema)

// export the model so we can import it in app.js
module.exports = {
    VocabWord,
}