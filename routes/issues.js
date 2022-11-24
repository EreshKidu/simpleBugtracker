const express = require("express");
const router = express.Router({mergeParams: true});
const multer  = require('multer');
const upload = multer();

const issues = require('../controllers/issues')


router.route('/')
.post(upload.none(),issues.createIssue)

router.route('/:issueId')
.get(issues.showIssue)
.put(issues.editIssue)
.delete(issues.deleteIssue)


module.exports = router;