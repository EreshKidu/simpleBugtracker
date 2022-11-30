const express = require("express");
const router = express.Router({mergeParams: true});
const multer  = require('multer');
const {storage} = require ('../cloudinary/index');
const upload = multer({ storage });


const issues = require('../controllers/issues')
const {isLoggedIn, isAuthor, isAssigned} = require ('../utils/middleware');


router.route('/')
.post(isLoggedIn, isAssigned, upload.none(),issues.createIssue)

router.route('/:issueId')
.get(isLoggedIn, isAssigned, issues.showIssue)
.put(isLoggedIn, isAuthor, upload.array('image'),issues.editIssue)
.delete(isLoggedIn, isAuthor, issues.deleteIssue)


module.exports = router;