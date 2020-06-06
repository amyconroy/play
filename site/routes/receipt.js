var express = require('express');
var router = express.Router();
var basketDB = require('./basket_db.js');

router.get('/', function(req, res) {
  var newOrder = {
    userId: req.session.user['userid'],
    orderPrice: 19.99,
    orderDate: Date.now()
  }
  console.log("USER ID");
  console.log(req.session.user['userid']);
  console.log(req.session.user);
  createOrder(newOrder, function(orderId){
    if(orderId){
      console.log("GOT ORDER ID");
      console.log(orderId);
      var basket = req.session.userBasket;
        for(let i = 0; i < basket.length; i++){
      // for each productId, add OrderDetails
          var newId = products[i].productId;
          var orderDetail = {
            productId: newId,
            orderId: orderId
          }
          basketDB.addOrderDetails(orderDetail);
        }
    }
    else{
      console.log("ERROR cant get orderId");
    }
    basketDB.getReceipt(orderId, (err, rows) => {
      var products = [];
      var receiptdetails = [];
      if(rows){
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
      if(receiptdetails){
        res.render('receipt', {
            layout : 'index_head',
            receipt: receiptdetails,
            product: products,
            userLoggedIn: req.session.user
        });
      }
    });
  });
});

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
