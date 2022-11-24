const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = require('./comment')

const IssueSchema = new Schema( {
    title: String,
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
    },
    issueType: {
        type: String,
        enum: ['Bug/error', 'Enhancement']
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]

});


IssueSchema.post('findOneAndDelete', async function(doc){
    console.log ("Deleting comments start");
    console.log (doc);
    if (doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        })
    }
})


module.exports = mongoose.model('Issue', IssueSchema)