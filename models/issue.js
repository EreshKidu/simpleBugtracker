const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseHistory = require('mongoose-history');
const User = require('./user');

const Comment = require('./comment');

const ImageSchema = new Schema( {
    url: String,
    filename: String
})
ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/h_250,c_scale');

})



const IssueSchema = new Schema( {
    title: String,
    description: String,

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
    }],
    images: [ImageSchema],
    
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    
    assignedUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

},
{ timestamps: true });



IssueSchema.plugin(mongooseHistory);

// Delete all comments inside issue
IssueSchema.post('findOneAndDelete', async function(doc){

    if (doc) {
        await Comment.deleteMany({
            _id: {
                $in: doc.comments
            }
        })

    }
})


module.exports = mongoose.model('Issue', IssueSchema)