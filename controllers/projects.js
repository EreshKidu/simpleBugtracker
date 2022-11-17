const Project = require ("../models/project");

module.exports.index = async (req, res) => {
    const projects = await Project.find ({});
    res.render("projects/index", {projects});
   
  }
  