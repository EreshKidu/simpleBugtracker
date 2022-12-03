const Project = require ("../models/project");
const User = require ("../models/user");

module.exports.index = async (req, res) => {
    const project = await Project
    .findById (req.params.projectId)
    .populate({path : 'assignedUsers'})
    
    res.send(project.assignedUsers);
   
  }
  
module.exports.assignUser = async (req, res) => {


    const project = await Project.findById(req.params.projectId);
    let user = await User.findOne ({"email" : req.body.email});
    


    if (!user) {
        console.log ('NO USERS FOUND')
        return res.send ('User not found');
    }

    user.role = req.body.role;

    await user.save();

    project.assignedUsers.push(user);

    await project.save();

    res.send(user);


  }

module.exports.deleteUser = async (req, res) => {
const project = await Project
.findById (req.params.projectId)

const indexOfUser = project.assignedUsers.findIndex(user => {
    return user._id === req.params.userId;
  });

project.assignedUsers.splice(indexOfUser, 1);

await project.save();

res.send(project.assignedUsers);

}
  