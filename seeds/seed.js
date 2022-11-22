const projects = require ("./projects");
const issues = require('./issues');
const comments = require('./comments');
const mongoose = require('mongoose');
const Project = require ('../models/project');
const Issue = require('../models/issue')
const Comment = require ('../models/comment')
const dbUrl = 'mongodb://localhost:27017/simple-Bugtracker';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const seedDB = async () => {
    await Project.deleteMany({});
    await Issue.deleteMany({});

    for (const project of projects) {
        const newProject = new Project ({
            title: project.title,
            description: project.description,
            createdAt: project.createdAt
        })

        for (const issue of issues) {
            const newIssue = new Issue ({
                description: issue.description,
                createdAt: issue.createdAt,
                status: issue.status,
                priority: issue.priority,
                issueType: issue.issueType
            });
            for (const comment of comments) {
                const newComment = new Comment ({
                    body: comment.body,
                    createdAt: comment.createdAt
                });
                await newComment.save();
                newIssue.comments.push(newComment);
            }
            console.log (newIssue);
            await newIssue.save();
            newProject.issues.push(newIssue);
        }

        await newProject.save();
    }
    
    

    }


seedDB().then(() => {
    mongoose.connection.close();
});