const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const historySchema = new Schema({
    t: Date,
    o: String,
    d: mongoose.Types.ObjectId
});
module.exports = mongoose.model('History', historySchema, 'issues_history');