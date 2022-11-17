const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema( {
    title: String,
    description: String,
    createdAt: Date
});

module.exports = mongoose.model('Project', ProjectSchema);