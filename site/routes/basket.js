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

// this will be /basket
router.get('/', function(req, res) {
  // CHANGE THIS
  // to render page will need total price and all product details

  // call getTotal, getProducts to render the basket page

  res.render('main', {
      layout : 'index_head',
      userLoggedIn: req.session.user
  });
});

var getProducts = function getProducts(orderDetails, callback){
  var orderProductArray = [];

  for(var i = 0, i < orderDetails.length; i++){
    var product = orderDetails[i];
    var productId = product.id;
    basketDB.getProductDetails(productId, (err, rows) =>{
      if(err || rows.length > 0){
        console.log("CAN'T GET PRODUCT DETAILS");
      }
      else if(rows.length > 0){
        var product = {
          description: rows.description,
          name: rows.name,
          price: rows.price,
          image: rows.image,
          qty: product.qty
        }
        orderProductArray.push(product);
      }
    });
  }
  callback(orderProductArray);
}

// productIds will be a JSON array of product Ids and qty
var getTotal = function getTotal(orderDetails, callback){
  var total = 0;

  // iterate through qty and products to get prices
  for(var i = 0, i < orderDetails.length; i++){
    var product = orderDetails[i];
    basketDB.getProductPrice(product.id, (err, rows) =>{
      if(err || rows.length > 0){
        console.log("CAN'T GET PRICE");
      }
      else if(rows.length > 0){
        var price = rows.price;
        total += price * product.qty;
      }
    });
  }
  callback(total);
}

router.get('/order', function(req, res){


});

module.exports = router;
