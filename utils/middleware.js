const ExpressError = require('./ExpressError');
const Project = require ('../models/project');
const Issue = require ('../models/issue');
const Comment = require ('../models/comment');

const getRequestedObj = async (req) => {
    const {projectId, issueId, commentId} = req.params;

    if (commentId) {
        return obj = await Comment.findById(commentId);
    } else if (issueId) { 

        return obj = await Issue.findById(issueId);
    } else if (projectId) { 

        return obj = await Project.findById(projectId);
    }


}

module.exports.isLoggedIn = (req, res, next) => {

    
    if (!req.isAuthenticated()){
        req.session.returnTo =  req.originalUrl;

        return res.redirect('/login');
    }
    next();
}


module.exports.isAuthor =  async (req, res, next) => {

    const obj = await getRequestedObj (req);
    

    if (!obj.author.equals(req.user._id)){
        return res.send("Something went wrong");
    }
    next ();
}


module.exports.isAssigned =  async (req, res, next) => {

    const {projectId} = req.params;

    const project = await Project.findById(projectId);


    if (!project.assignedUsers.includes(req.user._id)){
        return res.send("Something went wrong");
    }
    
    
    next ();
}
