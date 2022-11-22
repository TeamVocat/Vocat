const mongoose = require("mongoose")
const Schema = mongoose.Schema

const catSchema = new Schema({
    name: {
        type: String,
        required: false,
    },
    state: {
        type: Number,
        required: true,
    },
    hamburgers: {
        type: Number,
        required: true,
    },
    water: {
        type: Number,
        required: false,
    }
})

// create mongoose Model
const Cat = mongoose.model("Cat", catSchema)

// export the model so we can import it in app.js
module.exports = {
    Cat,
}
