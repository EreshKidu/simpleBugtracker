const Project = require ("../models/project");
const Issue = require ("../models/issue");
const Comment = require ("../models/comment");



module.exports.createComment = async (req, res) => {

  
    console.log (req.body, req.params.id);
    const newComment = new Comment(req.body.comment);
    const currentIssue = await Issue.findById(req.params.issueId);

    console.log(newComment, currentIssue);


    await newComment.save();
    currentIssue.comments.push(newComment);
    await currentIssue.save();
  
  
    res.send (newComment);
  }


module.exports.deleteComment= async (req, res) => {
  //const editedCampground = new Campground(req.body.campground);
  await Comment.findByIdAndDelete(req.params.commentId);
  res.redirect(`/projects/${req.params.projectId}/issues/${req.params.issueId}`);
}
   
