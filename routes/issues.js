const express = require("express");
const router = express.Router({mergeParams: true});
const multer  = require('multer');
const upload = multer({dest: 'public/uploads/'});

const issues = require('../controllers/issues')
const {isLoggedIn, isAuthor} = require ('../utils/middleware');


router.route('/')
.post(isLoggedIn, upload.none(),issues.createIssue)

router.route('/:issueId')
.get(isLoggedIn, issues.showIssue)
.put(isLoggedIn, isAuthor, upload.array('image'),issues.editIssue)
.delete(isLoggedIn, isAuthor, issues.deleteIssue)


module.exports = router;