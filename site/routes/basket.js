var express = require('express');
var router = express.Router();
var basketDB = require('./basket_db.js');


router.get('/', function(req, res) {
  console.log(req.session.user+" from basket");
  console.log(req.sessionID + " from basket");
  console.log(req.session.loggedIn);

  var basket = req.session.userBasket["products"];
  var total_price = req.session.userBasket["total_price"];
  var products = [];

  getProducts(basket, function(products) {
    if(products){
      res.render('basket', {
          layout : 'index_head',
          userLoggedIn: req.session.user,
          products: products,
          price: total_price
      });
    }
  });
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

// productIds will be a JSON array of product Ids and qty
/*var getTotal = function getTotal(orderDetails, callback){
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
  }
}*/

router.get('/remove_product/:productid', function(req, res) {
  console.log("HELP");
  var baseurl = req.params.base;
  var productId = req.params.productid;

  console.log("WE CAME FROM HERE: "+baseurl);

  var products = req.session.userBasket;

  console.log("BEFORE REMOVING");
  console.log(req.session.userBasket);
  console.log(products.length);

  for(let i = 0; i < products.length; i++){
    var item = products[i].productId;
    if(item === productId){
      products.splice(i, 1);
    }
  }
  console.log("REMOVED ITEMS");
  console.log(req.session.userBasket);

  req.session.userBasket = products;

  res.redirect('/basket');
});

router.get('/clearbasket', function(req, res) {
  var baseurl = req.params.base;

  console.log("WE CAME FROM HERE: "+baseurl);

  req.session.userBasket = [];

  console.log("EMPTIED BASKET");

  console.log(req.session.userBasket);
  res.redirect('/basket');
});


module.exports = router;
