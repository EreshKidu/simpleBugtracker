const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Issue = require('./issue')

const ProjectSchema = new Schema( {
    title: String,
    description: String,
    createdAt: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      },
    issues: [{
        type: Schema.Types.ObjectId,
        ref: 'Issue'
    }]

});

module.exports = mongoose.model('Project', ProjectSchema);