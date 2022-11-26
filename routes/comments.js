const express = require("express");
const router = express.Router({mergeParams: true});
const multer  = require('multer');
const upload = multer();

const comments = require('../controllers/comments')


router.route('/')
.post(upload.none(),comments.createComment)

router.route('/:commentId')
.delete(comments.deleteComment)

module.exports = router;