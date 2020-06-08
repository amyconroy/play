var express = require('express');
var router = express.Router();
var basketDB = require('./basket_db.js');

router.get('/', function(req, res) {
  var products = [];
  var receiptdetails = [];
  var orderId;

  var newOrder = {
    userId: req.session.user['userid'],
    orderPrice: req.session.userBasket["total_price"],
    orderDate: Date.now()
  }

  console.log("USER ID");
  console.log(req.session.user['userid']);
  console.log(req.session.user);

  createOrder(newOrder, function(orderId){
    if(orderId){
      console.log("GOT ORDER ID");
      console.log(orderId);
      var basket = req.session.userBasket['products'];
        for(let i = 0; i < basket.length; i++){
          var newId = basket[i].productid;
          var orderDetail = {
            productId: newId,
            orderId: orderId
          }
          basketDB.addOrderDetails(orderDetail);
          req.session.userBasket = [];
        }
        var receiptDetails = [];
        var totalPrice;
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
              console.log("TOTAL PRICE");
              console.log(rows[i].totalPrice);
              console.log("RECEIPT DETAILS");
              console.log(receiptDetails);
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
      console.log("ERROR cant get orderId");
    }
  });
  console.log(orderId);
  console.log("before rendering");
});


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

var createOrder = function createOrder(newOrder, callback){
  basketDB.createNewOrder(newOrder); // create new orderId
  // get order based on newest orderId (hacky, not good in terms of larger user base)
  basketDB.getOrderId((err, rows) => {
    if(err){
      console.log(err);
    }
    else{
      var orderId = rows.orderId;
      console.log("ORDER ID");
      console.log(orderId);
      callback(orderId);
    }
  });
  callback(null);
}


module.exports = router;
