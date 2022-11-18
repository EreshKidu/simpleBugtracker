const Project = require ("../models/project");

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