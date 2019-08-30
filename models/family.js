const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familySchema = new Schema({
        user_id: { type: String, default: 'debug' },
        family_id: { type: String, default: 'debug' }
})
const Family = mongoose.model("Family", familySchema);
module.exports = Family;
