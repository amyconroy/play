var express = require('express');
var router = express.Router();
var basketDB = require('./basket_db.js');

/* ORDER FOR NEW ORDER:
1. CALC TOTAL PRICE (getProductPrice - calc on this end)
using these details; ie three of one product (use price
you get back to do x3) (call basketDb.getProductPrice for
each product, calc here)
2. RENDER THE FIRST PAGE (basket page) - get Product Details
using the productIds (call basketDb.getProductDetails)
3. they buy, we create the order by:
a. basketDb.createNewOrder (pass in userId, orderPrice, orderDate)
b. basketDb.getOrderId - to get the orderId generated
c. basketDb.addOrderDetails - orderId and productId for each productId
(call function each time in a loop)
d. basketDb. getReceipt (pass in orderId to get all necessary info) */

module.exports = router;
