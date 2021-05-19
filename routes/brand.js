var express = require('express');
var router = express.Router();
const db = require("../models");
const brand = db.categories;
const brandController = require("../controller/brandController")
router.post('/brand', brandController.addBrand)
router.get('/brand', brandController.getAllbrand)
router.put('/brandUpdate/:BrandName', brandController.updateBrandInfo)
router.delete('/brandDelete/:BrandName', brandController.deleteBrand)
module.exports = router;