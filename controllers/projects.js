const Project = require ("../models/project");
const Issue = require ("../models/issue");
const User = require ("../models/user");


module.exports.index = async (req, res) => {
    const projects = await Project
    .find ({})
    .sort({ createdAt: 'descending' });
    res.render("projects/index", {projects});
   
  }
  
module.exports.createProject = async (req, res) => {

  
  // console.log (req.body.project); 
  const newProject = new Project(req.body.project);
  newProject.author = req.user._id;

  await newProject.save();
  res.send (newProject);
}

module.exports.showProject = async (req, res) => {

  const project = await Project.findById(req.params.projectId)
    .populate({path: "issues"})
    .populate({path : "assignedUsers"})
  // console.log (req.body.project);
  const statuses = Issue.schema.path('status').enumValues;
  const priorities = Issue.schema.path('priority').enumValues;
  const issueTypes = Issue.schema.path('issueType').enumValues;
  const roles = User.schema.path('role').enumValues;


  res.render ("projects/show", {project, statuses,priorities,issueTypes, roles});
}


module.exports.editProject= async (req, res) => {
  //const editedCampground = new Campground(req.body.campground);


  const project = await Project.findByIdAndUpdate(
    req.params.projectId,
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
   res.send(project);
}


module.exports.deleteProject= async (req, res) => {
  //const editedCampground = new Campground(req.body.campground);
  await Project.findByIdAndDelete(req.params.projectId);
  res.redirect("/projects");
}



