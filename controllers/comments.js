const Project = require ("../models/project");
const Issue = require ("../models/issue");
const Comment = require ("../models/comment");



module.exports.createComment = async (req, res) => {

  
    console.log (req.body, req.params.id);
    const newComment = new Comment(req.body.comment);
    const currentIssue = await Issue.findById(req.params.issueId);

    newComment.author = req.user._id;
    


    await newComment.save();
    currentIssue.comments.push(newComment);
    await currentIssue.save();
  
  
    res.send (newComment);
  }


module.exports.deleteComment= async (req, res) => {
  
  await Comment.findByIdAndDelete(req.params.commentId);
  res.send(`Comment deleted`);
}
   
