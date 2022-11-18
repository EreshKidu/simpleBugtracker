const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema( {
    description: String,
    createdAt: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      },
    status: {
        type: String,
        enum: ['New', 'In progress', 'Closed']
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High']
    }

});

module.exports = mongoose.model('Issue', IssueSchema)