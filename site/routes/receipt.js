var express = require('express');
var router = express.Router();
var basketDB = require('./basket_db.js');

router.get('/', function(req, res) {
  var products = [];
  var receiptdetails = [];
  var orderId;

  var newOrder = {
    userId: req.session.user['userid'],
    orderPrice: req.session.userBasket['total_price'],
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
        var receiptDetails = [];
        basketDB.getReceipt(orderId, (err, rows) => {
          console.log("huh");
          console.log(rows);
            // remains the same
            for(let i=0; i < rows.length; i++) {
              var receiptdeet = {
                orderid: rows[i].orderid,
                orderprice: rows[i].totalPrice,
                name: rows[i].name,
                price: rows[i].price,
                image: rows[i].image
              };
              console.log("PRODUCT FOR RECEIPT");
              console.log(receiptdeet);
              console.log("RECEIPT DETAILS");
              console.log(receiptDetails);
              receiptDetails.push(receiptdeet);
            }
            console.log("price total"+receiptDetails.totalprice);
            res.render('receipt', {
                layout : 'index_head',
                orderId: orderId,
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

/*  console.log("prior to getting query");
  console.log(orderId);
  console.log("SOS HELP ");
  console.log(orderId);
  var receiptDetails = [];

  generateReceipt(orderId, function(receiptDetails){
    console.log("DUCK ME");
    console.log(receiptDetails);
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
  }); */
});


var generateReceipt = function generateReceipt(orderId, callback){
  console.log("entering!!");
  var receiptDetails = [];
  basketDB.getReceipt(orderId, (err, rows) => {
    console.log("huh");
    console.log(rows);
      // remains the same
      var receiptdeet = {
        orderid: rows.orderid,
        orderprice: rows.totalPrice,
        name: rows.name,
        price: rows.price,
        image: rows.image
      };
      console.log("PRODUCT FOR RECEIPT");
    console.log(receiptdeet);
    console.log("RECEIPT DETAILS");
    console.log(receiptDetails);
    receiptDetails.push(receiptdeet);
    callback(receiptDetails);
    // ONLY WANT TO DO THIS ONCE !!!
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
