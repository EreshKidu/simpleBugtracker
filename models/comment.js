const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema( {
    body: String,
    createdAt: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      },
    

});

module.exports = mongoose.model('Comment', CommentSchema)