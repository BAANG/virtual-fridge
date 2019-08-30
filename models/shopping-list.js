const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoppingListSchema = new Schema({
    family_id: {
        type: String
    },
    user_id: {
        type: String
    },
    items: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema)
module.exports = ShoppingList;