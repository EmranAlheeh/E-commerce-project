var express = require('express');
var router = express.Router();
const db = require("../models");
const Sales = db.sales;

const salesController = require("../controllers/sales");
 router.post('/newpro',salesController.createpro);
 router.get('/allsales/:Discount', salesController.SearchforSales);
 router.get('/sale',salesController.withoutDISCOUNT);
 router.put('/create/:id',salesController.createSale);
 router.put('/delete/:id', salesController.deleteSale);

module.exports = router;