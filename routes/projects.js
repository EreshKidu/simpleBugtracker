const express = require("express");
const router = express.Router();
const multer  = require('multer');
const upload = multer();

const projects = require('../controllers/projects')


router.route('/')
.get(projects.index)
.post(upload.none(),projects.createProject)

router.route("/:id")
.get(projects.showProject)
.post(upload.none(),projects.createProject)

module.exports = router;