var express = require('express');
var router = express.Router();
const db = require("../models");
const Cart = db.carts;

const cartsController = require("../controllers/carts");

//add product to cart
router.post('/product', cartsController.addProduct);

//delete product from cart
router.delete('/product/:CartID', cartsController.deleteProduct);

//view product in the cart
router.get('/product', cartsController.viewProducts);

//search for product
router.get('/search/:ProductID', cartsController.searchForProduct);

//view products in the cart for this user 
router.get('/product/:UserID', cartsController.viewProductsByUser);

module.exports = router;