var express = require('express');
var router = express.Router();
const db = require("../models");
const Category = db.categories;
const categoryController = require("../controller/categoryController")
router.post('/relation', categoryController.addCategoryBrand)

router.post('/category', categoryController.addCategory)
router.get('/category', categoryController.getAllCategory)
router.put('/categoryUpdate/:CategoryID', categoryController.updateCategoryInfo)
router.delete('/categoryDelete/:CategoryID', categoryController.deleteCategory)

module.exports = router;