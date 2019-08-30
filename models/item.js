const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Item = mongoose.model("Item", itemSchema)
module.exports = Item;