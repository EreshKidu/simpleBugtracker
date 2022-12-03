const express = require("express");
const router = express.Router({mergeParams: true});
const multer  = require('multer');
const upload = multer();
const {isLoggedIn, isAuthor, isAssigned} = require ('../utils/middleware');
const catchAsync = require("../utils/catchAsync");

const projectTeam = require('../controllers/projectTeam')


router.route('/')
.get(isLoggedIn, catchAsync(isAssigned), catchAsync(projectTeam.index))
.post(isLoggedIn, catchAsync(isAuthor) ,  upload.none(), catchAsync(projectTeam.assignUser))


router.route('/:userId')
.delete(isLoggedIn, catchAsync(isAuthor), catchAsync(projectTeam.deleteUser))

module.exports = router;