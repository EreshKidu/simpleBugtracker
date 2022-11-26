const Project = require ("../models/project");
const Issue = require ("../models/issue");
const IssueHistory = require ('../models/issueHistory');
const mongoose = require('mongoose');



module.exports.createIssue = async (req, res) => {

  

     const newIssue = new Issue(req.body.issue);
    const currentProject = await Project.findById(req.params.projectId);

    await newIssue.save();
    currentProject.issues.push(newIssue);
    await currentProject.save();
  
  
    res.send (newIssue);
  }


  module.exports.showIssue = async (req, res) => {

    const issue = await Issue.findById(req.params.issueId)
      .populate({path: "comments", options: { sort: {'createdAt': 'descending' } }})

    const project = await Project.findById(req.params.projectId)



    let issueHistory = await IssueHistory.find({"d._id" :  new mongoose.Types.ObjectId (req.params.issueId)});
    

    const statuses = Issue.schema.path('status').enumValues;
    const priorities = Issue.schema.path('priority').enumValues;
    const issueTypes = Issue.schema.path('issueType').enumValues;


  
    res.render ("issues/show", {issue, project,statuses,priorities,issueTypes, issueHistory});
  }

  module.exports.editIssue= async (req, res) => {

    //Changed from .findByIdAndUpdate to .save() to track changes in History
    let issue = await Issue.findById(req.params.issueId);

    //req.body has edited issue
    issue = Object.assign(issue, req.body);

    await issue.save();
  
    // const issue = await Issue.findByIdAndUpdate(
    //   req.params.issueId,
    //   req.body
    // );




    // if (req.body.deleteImages) {
    //   for (let filename of req.body.deleteImages) {
    //     await cloudinary.uploader.destroy(filename);
    //   }
    //   await campground.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}});
    //   console.log(campground);
    // }
  
    // req.flash("success", "Successfuly updated campground!");
     res.send(issue);
  }
  

  module.exports.deleteIssue= async (req, res) => {
    //const editedCampground = new Campground(req.body.campground);
    await Issue.findByIdAndDelete(req.params.issueId);
    res.redirect(`/projects/${req.params.projectId}`);
  }
  
  
  
  
  