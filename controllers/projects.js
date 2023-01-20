const Project = require ("../models/project");
const Issue = require ("../models/issue");
const User = require ("../models/user");


module.exports.index = async (req, res) => {
    const projects = await Project
    .find ({ assignedUsers: req.user._id})
    .sort({ createdAt: 'descending' })
    .populate({path: "author"})

    const pageName = 'projects';

    res.render("projects/index", {projects, pageName});
   
  }
  
module.exports.createProject = async (req, res) => {

  

  const newProject = new Project(req.body.project);
  newProject.author = req.user._id;
  // Add author automatically to assigned, so it can access it
  newProject.assignedUsers.push(req.user._id);

  newProject.populate({path: "author"});
  await newProject.save();
  
  res.send (newProject);
}

module.exports.showProject = async (req, res) => {

  const project = await Project.findById(req.params.projectId)
    .populate({path: "issues"})
    .populate({path : "assignedUsers"})
    .populate({path: "author"})
  
  //Get enum values  from model
  const statuses = Issue.schema.path('status').enumValues;
  const priorities = Issue.schema.path('priority').enumValues;
  const issueTypes = Issue.schema.path('issueType').enumValues;
  const roles = User.schema.path('role').enumValues;
  const pageName = 'projects';


  res.render ("projects/show", {project, statuses,priorities,issueTypes, roles, pageName});
}


module.exports.editProject= async (req, res) => {
  
  const project = await Project.findByIdAndUpdate(
    req.params.projectId,
    req.body
  );


   res.send(project);
}


module.exports.deleteProject= async (req, res) => {
  
  await Project.findByIdAndDelete(req.params.projectId);
  res.redirect("/projects");
}



