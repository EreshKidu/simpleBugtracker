const express = require("express");
const router = express.Router({mergeParams: true});
const multer  = require('multer');
const upload = multer();
const {isLoggedIn, isAuthor, isAssigned} = require ('../utils/middleware');
const catchAsync = require("../utils/catchAsync");


const projects = require('../controllers/projects')


router.route('/')
.get(isLoggedIn,catchAsync(projects.index))
.post(isLoggedIn,upload.none(),catchAsync(projects.createProject))

router.route("/:projectId")
.get(isLoggedIn,catchAsync(isAssigned), catchAsync(projects.showProject))
.put(isLoggedIn, catchAsync(isAuthor), catchAsync(projects.editProject))
.delete(isLoggedIn,catchAsync(isAuthor), catchAsync(projects.deleteProject))

module.exports = router;