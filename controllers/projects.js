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

  console.log (statuses, priorities);

  res.render ("projects/show", {project, statuses,priorities,issueTypes });
}


module.exports.createIssue = async (req, res) => {

  
  // console.log (req.body.project);
  const newIssue = new Issue(req.body.issue);
  const project = await Project.findById(req.params.id)
  await newIssue.save();
  project.issues.push(newIssue);
  await project.save();


  res.send (newIssue);
}