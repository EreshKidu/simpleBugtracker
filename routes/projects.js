const express = require("express");
const router = express.Router({mergeParams: true});
const multer  = require('multer');
const upload = multer();

const projects = require('../controllers/projects')


router.route('/')
.get(projects.index)
.post(upload.none(),projects.createProject)

router.route("/:id")
.get(projects.showProject)
.put(projects.editProject)
.delete(projects.deleteProject)

module.exports = router;