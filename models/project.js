const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseHistory = require('mongoose-history');


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

ProjectSchema.plugin(mongooseHistory);


ProjectSchema.post('findOneAndDelete', async function(doc){

    if (doc) {
        for (issue of doc.issues) {
            await Issue.findOneAndDelete (issue._id)
        }
        
    }
})


module.exports = mongoose.model('Project', ProjectSchema);