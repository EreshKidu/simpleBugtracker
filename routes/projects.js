const express = require("express");
const router = express.Router({mergeParams: true});
const multer  = require('multer');
const upload = multer();
const {isLoggedIn, isAuthor} = require ('../utils/middleware');

const projects = require('../controllers/projects')


router.route('/')
.get(projects.index)
.post(isLoggedIn,upload.none(),projects.createProject)

router.route("/:projectId")
.get(isLoggedIn,projects.showProject)
.put(isLoggedIn, isAuthor, projects.editProject)
.delete(isLoggedIn,isAuthor, projects.deleteProject)

module.exports = router;