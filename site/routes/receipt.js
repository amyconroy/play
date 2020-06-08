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

  createOrder(newOrder, function(orderId){
    if(orderId){
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
  basketDB.getOrderId((err, rows) => {
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
