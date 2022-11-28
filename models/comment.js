const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const CommentSchema = new Schema( {
    body: String,
    createdAt: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      },
      author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

});

module.exports = mongoose.model('Comment', CommentSchema)