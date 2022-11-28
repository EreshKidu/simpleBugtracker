const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseHistory = require('mongoose-history');
const User = require('./user');


const Issue = require('./issue')

const ProjectSchema = new Schema( {
    title: String,
    description: String,
    issues: [{
        type: Schema.Types.ObjectId,
        ref: 'Issue'
    }],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

},
{ timestamps: true });

ProjectSchema.plugin(mongooseHistory);


ProjectSchema.post('findOneAndDelete', async function(doc){

    if (doc) {
        for (issue of doc.issues) {
            await Issue.findOneAndDelete (issue._id)
        }
        
    }
})


module.exports = mongoose.model('Project', ProjectSchema);