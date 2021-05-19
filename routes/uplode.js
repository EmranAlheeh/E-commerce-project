var express = require('express');
var router = express.Router();
const uploadFileController = require("../controller/uploadFileController");
router.get('/file-upload', uploadFileController.getHtmlPage );
router.post('/brandImage', uploadFileController.uploadBrandImg);
router.post('/productImage', uploadFileController.uploadProductImg);

module.exports = router; 