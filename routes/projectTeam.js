const express = require("express");
const router = express.Router({mergeParams: true});
const multer  = require('multer');
const upload = multer();
const {isLoggedIn, isAuthor, isAssigned} = require ('../utils/middleware');

const projectTeam = require('../controllers/projectTeam')


router.route('/')
.get(isLoggedIn, isAssigned,projectTeam.index)
.post(isLoggedIn,isAuthor,  upload.none(),projectTeam.assignUser)


router.route('/:userId')
.delete(isLoggedIn, isAuthor,projectTeam.deleteUser)

module.exports = router;