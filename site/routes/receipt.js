var express = require('express');
var router = express.Router();
var basketDB = require('./basket_db.js');

router.get('/', function(req, res) {
  var products = [];
  var receiptdetails = [];
  var orderId;

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
      var basket = req.session.userBasket['products'];
        for(let i = 0; i < basket.length; i++){
          var newId = basket[i].productid;
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
    console.log("prior to getting query");
    console.log(orderId);
  });

  console.log("SOS HELP ");
  console.log(orderId);
  var receiptDetails = [];

  generateReceipt(orderId, function(receiptDetails){
    if(receiptDetails){
      res.render('receipt', {
          layout : 'index_head',
          receipt: receiptDetails,
          userLoggedIn: req.session.user
      });
    }
    else{
      console.log("can't get receipt details.");
    }
  });
});


var generateReceipt = function generateReceipt(orderId, callback){
  console.log("entering!!");

  //var receiptDetails = [];

  basketDB.getReceipt(orderId, (err, rows) => {
    console.log("huh");
    console.log(rows);

    var receiptDetails = [];

    if(rows.length > 0){
      // remains the same
      var receiptdetails = {
        orderid: rows[0].orderId,
        orderprice: rows[0].totalPrice,
        name: rows[0].name,
        price: rows[0].price,
        image: rows[0].image
      }
      console.log("PRODUCT FOR RECEIPT");
      console.log(product);
      receiptDetails.push(product);
    }
    else{
      console.log("ERROR: can't get receipt");
    }
    console.log("RECEIPT DETAILS");

    // ONLY WANT TO DO THIS ONCE !!!
    callback(receiptdetails);
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
