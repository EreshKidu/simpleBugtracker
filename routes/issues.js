const express = require("express");
const router = express.Router({mergeParams: true});
const multer  = require('multer');
const upload = multer({dest: 'public/uploads/'});

const issues = require('../controllers/issues')


router.route('/')
.post(upload.none(),issues.createIssue)

router.route('/:issueId')
.get(issues.showIssue)
.put(upload.array('image'),issues.editIssue)
.delete(issues.deleteIssue)


module.exports = router;