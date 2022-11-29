const express = require("express");
const router = express.Router({mergeParams: true});
const multer  = require('multer');
const upload = multer();
const {isLoggedIn, isAuthor} = require ('../utils/middleware');

const projectTeam = require('../controllers/projectTeam')


router.route('/')
.get(projectTeam.index)
.post(upload.none(),projectTeam.assignUser)

module.exports = router;