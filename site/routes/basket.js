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

// var basket = req.session.userBasket
// basket[i].productId

// this will be /basket
router.get('*/', function(req, res) {
  console.log(req.session.user+" from index");
  console.log(req.sessionID + " from index");
  console.log(req.session.loggedIn);

  var basket = req.session.userBasket;
  var productId = basket[0].productId;
  console.log(productId);
  var products = [];
  var total;

  getTotal(basket, function(total) {
    console.log(total);
    console.log("got toals");
  });

  getProducts(basket, function(products) {
      console.log("got products");
      console.log(products);
  });

  res.render('basket', {
      layout : 'index_head',
      userLoggedIn: req.session.user,
      product: products,
      total: total
  });
});

var getProducts = function getProducts(orderDetails, callback){
  var orderProductArray = [];

  for(var i = 0; i < orderDetails.length; i++){
    var productId = orderDetails[i].productId;

    console.log("ORDER DETAILS");

    basketDB.getProductDetails(productId, (err, rows) =>{
      if(err){
        console.log("CAN'T GET PRODUCT DETAILS / no products in basket?");
      }
      else if(rows){
        var product = {
          description: rows.description,
          name: rows.name,
          price: rows.price,
          image: rows.image
        }
        orderProductArray.push(product);
        console.log("TEST PRODUCT");
        console.log(product);
      }
      console.log("TEST PRODUCT ARRAY");
      console.log(orderProductArray);
      callback(orderProductArray);
    });
  }
}

// productIds will be a JSON array of product Ids and qty
var getTotal = function getTotal(orderDetails, callback){
  var total = 0;
  // iterate through qty and products to get prices
  for(var i = 0; i < orderDetails.length; i++){
    var product = orderDetails[i].productId;
    basketDB.getProductPrice(product, (err, rows) =>{
      if(err){
        console.log("Can't get price");
      }
      else{
        var price = rows.price;
        console.log("PRICE");
        console.log(price);
        var newprice = price.substr(1);
        console.log("NEW PRICE");
        console.log(newprice);
        var intprice = parseInt(newprice);
        console.log("int price");
        console.log(intprice);
        total += intprice;
        console.log("total here:");
        console.log(total);
      }
    });
    console.log("TOTAL");
    console.log(total);
    callback(total);
  }
}

/*
a. basketDb.createNewOrder (pass in userId, orderPrice, orderDate)
b. basketDb.getOrderId - to get the orderId generated
c. basketDb.addOrderDetails - orderId and productId for each productId */
// need to get the order price from session?
// a. basketDb.createNewOrder (pass in userId, orderPrice, orderDate)
router.get('/order', function(req, res){
  var newOrder = {
    userId: 2,
    orderPrice: 19.99,
    orderDate: Date.now()
  }
  createOrder(newOrder, function(orderId){
    if(orderId){
      // for each productId, add OrderDetails
      var orderDetail = {
        productId: prodId,
        orderId: orderId
      }
      basketDB.addOrderDetails(orderDetail);
    }
    else{
      console.log("ERROR cant get orderId");
    }
  });
  basketDB.getReceipt(orderId, (err, rows) => {
    var products = [];
    var receiptdetails = [];
    if(rows.length > 0){
      // remains the same
      var receipt = {
        orderid: rows.orderid,
        orderprice: rows.totalPrice
      }
      var product = {
        name: rows.name,
        price: rows.price,
        image: rows.image
      }
      products.push(product);
    }
    else{
      console.log("ERROR can't get receipt");
    }
    // ONLY WANT TO DO THIS ONCE !!!
    receiptdetails.push(receipt);
  });
  // res.render with receipt, product
});

var createOrder = function createOrder(newOrder, callback){
  basketDB.createNewOrder(newOrder); // create new orderId
  // get order based on newest orderId (hacky, not good in terms of larger user base)
  basketDB.getOrderId((err, rows) => {
    if(err){
      console.log(err);
    }
    else{
      var orderId = rows.id;
      callback(orderId);
    }
  });
  callback(null);
}

module.exports = router;
