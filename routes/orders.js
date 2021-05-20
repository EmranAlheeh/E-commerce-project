var express = require('express');
var router = express.Router();
const db = require("../models");
const Order = db.orders;

const ordersController = require("../controllers/orders");

//add order
router.post('/order', ordersController.addOrder);

//get orders
router.get('/order', ordersController.getOrders);

//update status
router.put('/order/:OrderID', ordersController.changeStatus);

//get status = true
router.get('/status', ordersController.getTrue);

//delete order
router.delete('/order/:OrderID', ordersController.deleteOrder);


module.exports = router;