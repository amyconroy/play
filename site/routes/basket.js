var express = require('express');
var router = express.Router();
var basketDB = require('./basket_db.js');


router.get('/', function(req, res) {
  console.log(req.session.user+" from basket");
  console.log(req.sessionID + " from basket");
  console.log(req.session.loggedIn);

  if (req.session.user) {

    var basket = req.session.userBasket["products"];
    var total_price = req.session.userBasket["total_price"];
    var products = [];

    getProducts(basket, function(products) {
      if(products){
        res.render('basket', {
            layout : 'download_head',
            userLoggedIn: req.session.user,
            products: products,
            price: total_price
        });
      }
    });

  } else {

    res.render('basket', {
      layout : 'download_head',
      error: true,
      errormessage: "You must be logged in to view basket"
    });

  }
});

var getProducts = function getProducts(orderDetails, callback){
  var orderProductArray = [];

  for(var i = 0; i < orderDetails.length; i++){
    var productId = orderDetails[i].productid;

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
          image: rows.image,
          id: rows.productId
        }
        orderProductArray.push(product);
      }
      console.log("TEST PRODUCT ARRAY");
      console.log(orderProductArray);
    });
  }
  callback(orderProductArray);
}

router.get('/remove_product/:productid', function(req, res) {
  console.log("HELP");
  var baseurl = req.params.base;
  var productId = req.params.productid;

  console.log("WE CAME FROM HERE: "+baseurl);

  var products = req.session.userBasket['products'];

  console.log("BEFORE REMOVING");
  console.log(req.session.userBasket);
  console.log(products.length);

  for(let i = 0; i < products.length; i++){
    var item = products[i].productId;
    if(item === productId){
      products.splice(i, 1);
      req.session.userBasket['total_price'] -= products.productprice;
    }
  }
  console.log("REMOVED ITEMS");
  console.log(req.session.userBasket);

  req.session.userBasket['products'] = products;

  res.redirect('/basket');
});

router.get('/clearbasket', function(req, res) {
  var baseurl = req.params.base;

  console.log("WE CAME FROM HERE: "+baseurl);

  req.session.userBasket['products'] = [];
  req.session.userBasket['total_price'] = 0;

  console.log("EMPTIED BASKET");
  console.log(req.session.userBasket);

  res.redirect('/basket');
});


module.exports = router;
