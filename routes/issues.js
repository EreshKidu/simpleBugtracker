const express = require("express");
const router = express.Router({mergeParams: true});
const multer  = require('multer');
const {storage} = require ('../cloudinary/index');
const upload = multer({ storage });
const catchAsync = require("../utils/catchAsync");



const issues = require('../controllers/issues')
const {isLoggedIn, isAuthor, isAssigned} = require ('../utils/middleware');


router.route('/')
.post(isLoggedIn, catchAsync(isAssigned), upload.none(),catchAsync(issues.createIssue))

router.route('/:issueId')
.get(isLoggedIn, catchAsync(isAssigned), catchAsync(issues.showIssue))
.put(isLoggedIn, catchAsync(isAssigned), upload.array('image'), catchAsync(issues.editIssue))
.delete(isLoggedIn, catchAsync(isAuthor), catchAsync(issues.deleteIssue))


module.exports = router;