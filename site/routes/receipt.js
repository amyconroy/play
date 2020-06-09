"use strict";
var express = require('express');
var router = express.Router();
var basketDB = require('../database/basket_db.js');

router.get('/', function(req, res) {
  var products = [];
  var receiptdetails = [];
  var orderId;

  var newOrder = {
    userId: req.session.user['userid'],
    orderPrice: req.session.userBasket["total_price"],
    orderDate: Date.now()
  }
  // creates a new order in the database
  createOrder(newOrder, function(orderId){
    if(orderId){
      var basket = req.session.userBasket['products'];
        for(let i = 0; i < basket.length; i++){
          var newId = basket[i].productid;
          var orderDetail = {
            productId: newId,
            orderId: orderId
          }
          // adds the product details to the database
          basketDB.addOrderDetails(orderDetail);
          req.session.userBasket['products'] = [];
          req.session.userBasket['total_price'] = 0;
        }
        var receiptDetails = [];
        var totalPrice;
        // renders the receipt on the database
        basketDB.getReceipt(orderId, (err, rows) => {
            // remains the same
            for(let i=0; i < rows.length; i++) {
              var receiptdeet = {
                orderid: rows[i].orderid,
                orderprice: rows[i].totalPrice,
                name: rows[i].name,
                price: rows[i].price,
                image: rows[i].image
              };
              // for each row (product in order) push to the array
              receiptDetails.push(receiptdeet);
              totalPrice = rows[i].totalPrice;
            }
            res.render('receipt', {
                layout : 'index_head',
                orderId: orderId,
                totalPrice: totalPrice,
                receiptDetails: receiptDetails,
                userLoggedIn: req.session.user
            });
        });
    }
    else{
      console.log("ERROR: can't get orderId or render receipt.");
    }
  });
});

// gets details to generate the receip
var generateReceipt = function generateReceipt(orderId, callback){
  var receiptDetails = [];
  basketDB.getReceipt(orderId, (err, rows) => {
      // remains the same
      var receiptdeet = {
        orderid: rows.orderid,
        orderprice: rows.totalPrice,
        name: rows.name,
        price: rows.price,
        image: rows.image
      };
    receiptDetails.push(receiptdeet);
    callback(receiptDetails);
  });
}

// creates an order in the database
var createOrder = function createOrder(newOrder, callback){
  basketDB.createNewOrder(newOrder); // create new orderId
  basketDB.getOrderId((err, rows) => { // gets the orderId that we just created
    if(err){
      console.log(err);
    }
    else{
      var orderId = rows.orderId;
      callback(orderId);
    }
  });
  callback(null);
}


module.exports = router;
