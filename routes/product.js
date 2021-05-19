var express = require('express');
var unirest = require("unirest");
var router = express.Router();
const db = require('../models');
const Prouduct = db.products;
const ProductDetailes=db.prouductDetailes;
const productController = require('../controller/pruductController');
router.post('/product',productController.addProduct);
router.post('/productDetailes',productController.addProductDetailes);
router.post('/productImage',productController.addProductImage);
router.get('/product',productController.getAllProduct);
router.get('/productDetailes',productController.getAllProductWithDetailes);
router.get('/search/:id',productController.searchProduct,productController.searchCategory);
//router.get('/search/:CategoryID',productController.categoryAllProducts);
router.put('/updateProduct/:ProductID',productController.updateProductInfo);
router.delete('/deleteProduct/:ProductID',productController.deleteProduct);

module.exports = router;

