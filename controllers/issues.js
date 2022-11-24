const Project = require ("../models/project");
const Issue = require ("../models/issue");



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
      .populate({path: "comments"})

    const project = await Project.findById(req.params.projectId)

    const statuses = Issue.schema.path('status').enumValues;
    const priorities = Issue.schema.path('priority').enumValues;
    const issueTypes = Issue.schema.path('issueType').enumValues;


  
    res.render ("issues/show", {issue, project,statuses,priorities,issueTypes});
  }

  module.exports.editIssue= async (req, res) => {
    //const editedCampground = new Campground(req.body.campground);
  
  
    const issue = await Issue.findByIdAndUpdate(
      req.params.issueId,
      req.body
    );
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
  
  
  
  
  