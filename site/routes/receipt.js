var express = require('express');
var router = express.Router();
var basketDB = require('./basket_db.js');

router.get('/', function(req, res) {
  var products = [];
  var receiptdetails = [];

  var newOrder = {
    userId: req.session.user['userid'],
    orderPrice: 19.99,
    orderDate: Date.now()
  }

  //LOG USER STUFF
  console.log("USER ID INSIDE RECIEPT");
  console.log(req.session.user);

  createOrder(newOrder, function(orderId) {
    console.log("MAKING NEW ORDER");
    //for every product

    if (orderId) {
      console.log("GOT ORDER ID");
      console.log(orderId);

      var basket = req.session.userBasket;
        for(let i = 0; i < basket.length; i++){
      // for each productId, add OrderDetails
          var newId = basket[i].productId;
          var orderDetail = {
            productId: newId,
            orderId: orderId
          }
          basketDB.addOrderDetails(orderDetail);
        }

        console.log("prior to getting query");
        console.log(orderId);

        basketDB.getReceipt(orderId, (err, rows) => {
          if (rows) {
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
              console.log("PRODUCT FOR RECEIPT");
              console.log(product);
              products.push(product);
          } else {
            console.log("ERROR: can't get receipt");
          }

          console.log("RECEIPT DETAILS");
          console.log(receipt);

          receiptdetails.push(receipt);
      });

    } else {
      console.log("ERROR: can't get orderId.");
    }

// These are null !!!
    console.log("STUFF NOIW:");
    console.log(products);
    console.log(receiptdetails);


  });

  console.log("AFTER CALLBACK");
  console.log(receiptdetails);

  res.send("dw");
  /*console.log("RECIEPT DETAILS");
  console.log(receiptdetails);
  if (receiptdetails.length == 0 ) {
    console.log("LENGTH OF RECIEPT "+receiptdetails.length);

    res.render('receipt', {
      layout : 'index_head',
      receipt: receiptdetails,
      product: products,
      userLoggedIn: req.session.user
    });
  } else {
    console.log("LENGTH OF RECIEPT "+receiptdetails.length)
    res.send("all good");
  }*/
  //res.send("RIP");
});

var renderInfo = function renderInfo(res, receiptdetails, products){

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
