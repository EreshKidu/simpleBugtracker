const Project = require ("../models/project");
const Issue = require ("../models/issue");



module.exports.createIssue = async (req, res) => {

  
    console.log (req.body, req.params.id);
     const newIssue = new Issue(req.body.issue);
    const currentProject = await Project.findById(req.body.projectID);

    console.log(newIssue, currentProject);


    await newIssue.save();
    currentProject.issues.push(newIssue);
    await currentProject.save();
  
  
    res.send (newIssue);
  }


  module.exports.showIssue = async (req, res) => {

    const issue = await Issue.findById(req.params.id)
      .populate({path: "comments"})
    // console.log (req.body, req.params.id);
    //  const newIssue = new Issue(req.body.issue);
    // const currentProject = await Project.findById(req.body.projectID);

    // console.log(newIssue, currentProject);


    // await newIssue.save();
    // currentProject.issues.push(newIssue);
    // await currentProject.save();
  
  
    res.render ("issues/show", {issue});
  }


  