const Project = require ("../models/project");
const Issue = require ("../models/issue");

module.exports.index = async (req, res) => {
    const projects = await Project
    .find ({})
    .sort({ createdAt: 'descending' });
    res.render("projects/index", {projects});
   
  }
  
module.exports.createProject = async (req, res) => {

  
  // console.log (req.body.project); 
  const newProject = new Project(req.body.project);
  await newProject.save();
  res.send (newProject);
}

module.exports.showProject = async (req, res) => {

  const project = await Project.findById(req.params.id)
    .populate({path: "issues"})
  // console.log (req.body.project);
  const statuses = Issue.schema.path('status').enumValues;
  const priorities = Issue.schema.path('priority').enumValues;
  const issueTypes = Issue.schema.path('issueType').enumValues;


  res.render ("projects/show", {project, statuses,priorities,issueTypes });
}


module.exports.editProject= async (req, res) => {
  //const editedCampground = new Campground(req.body.campground);


  const project = await Project.findByIdAndUpdate(
    req.params.id,
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
  await Project.findByIdAndDelete(req.params.id);
  res.redirect("/projects");
}



