const express = require("express");
const router = express.Router({mergeParams: true});
const multer  = require('multer');
const upload = multer();

const comments = require('../controllers/comments')
const {isLoggedIn, isAuthor, isAssigned} = require ('../utils/middleware');


router.route('/')
.post(isLoggedIn, isAssigned, upload.none(),comments.createComment)

router.route('/:commentId')
.delete(isLoggedIn, isAuthor, comments.deleteComment)

module.exports = router;