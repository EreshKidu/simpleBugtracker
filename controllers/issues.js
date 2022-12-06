const Project = require ("../models/project");
const Issue = require ("../models/issue");
const IssueHistory = require ('../models/issueHistory');
const mongoose = require('mongoose');
const {cloudinary} = require("../cloudinary");


module.exports.createIssue = async (req, res) => {

  

     const newIssue = new Issue(req.body.issue);
    const currentProject = await Project.findById(req.params.projectId);
    newIssue.author = req.user._id;

    await newIssue.save();
    currentProject.issues.push(newIssue);
    await currentProject.save();
  
  
    res.send (newIssue);
  }


  module.exports.showIssue = async (req, res) => {

    const issue = await Issue.findById(req.params.issueId)
      .populate({path: "comments", 
        options: { 
          sort: {'createdAt': 'descending' } }, 
        populate: {
          path: 'author',
      } })
      .populate({path : "assignedUser"})
      .populate({path : "author"})
      

    const project = await Project.findById(req.params.projectId)
      .populate({path : "assignedUsers"})

    let issueHistory = await IssueHistory.find({"d._id" :  new mongoose.Types.ObjectId (req.params.issueId)})
    .sort({ t: 'descending' });
    

    const statuses = Issue.schema.path('status').enumValues;
    const priorities = Issue.schema.path('priority').enumValues;
    const issueTypes = Issue.schema.path('issueType').enumValues;
    const pageName = 'about';


  
    res.render ("issues/show", {issue, project,statuses,priorities,issueTypes, issueHistory, pageName});
  }

  module.exports.editIssue= async (req, res) => {

    //Changed from .findByIdAndUpdate to .save() to track changes in History
    let issue = await Issue.findById(req.params.issueId);
    

    //req.body has edited issue

    if (req.files) {
      issue.images = req.files.map (f => ({url: f.path, filename: f.filename}));

    } else {
      issue = Object.assign(issue, req.body);

    }
    
    
    await issue.save();
    await issue.populate ({path: "images"});
    

    if (req.files){
      // res.redirect(`/projects/${req.params.projectId}/issues/${req.params.issueId}`)
      res.send (issue.images);
    }
  
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
  
  
  
  
  