const express = require("express");
const router = express.Router({mergeParams: true});
const multer  = require('multer');
const upload = multer();
const catchAsync = require("../utils/catchAsync");


const comments = require('../controllers/comments')
const {isLoggedIn, isAuthor, isAssigned} = require ('../utils/middleware');


router.route('/')
.post(isLoggedIn, catchAsync(isAssigned), upload.none(), catchAsync(comments.createComment))

router.route('/:commentId')
.delete(isLoggedIn, catchAsync(isAuthor), catchAsync(comments.deleteComment))

module.exports = router;