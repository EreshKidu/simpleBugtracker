const express = require("express");
const router = express.Router();
const multer  = require('multer');
const upload = multer();

const issues = require('../controllers/issues')


router.route('/')
.post(upload.none(),issues.createIssue)

router.route('/:id')
.get(issues.showIssue)




module.exports = router;