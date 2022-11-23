const express = require("express");
const router = express.Router({mergeParams: true});
const multer  = require('multer');
const upload = multer();

const comments = require('../controllers/comments')


router.route('/')
.post(upload.none(),comments.createComment)

module.exports = router;