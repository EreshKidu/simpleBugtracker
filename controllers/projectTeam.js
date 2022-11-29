const Project = require ("../models/project");
const User = require ("../models/user");

module.exports.index = async (req, res) => {
    const projects = await Project
    .find ({})
    .sort({ createdAt: 'descending' });
    res.render("projects/index", {projects});
   
  }
  
module.exports.assignUser = async (req, res) => {


    const project = await Project.findById(req.params.projectId);
    let user = await User.findOne ({"email" : req.body.email});
    user.role = req.body.role;
    console.log ('_________________________________')
    console.log(user);


    if (!user) {
        console.log ('NO USERS FOUND')
        res.send ('User not found');
    }

    await user.save();

    project.assignedUsers.push(user);

    await project.save();

    res.send(user);


  }
  