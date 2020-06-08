"use strict";
var express = require('express');
var router = express.Router();
var productsDB = require('./products_db.js');
var basketDB = require('./basket_db.js');

router.get('/', function(req, res){
  console.log("FROM PRODUCTS");
  console.log(req.session.user);
  console.log(req.sessionID);

  res.render('products', {
    layout : 'product_head',
    userLoggedIn: req.session.user
  });
});

// add product to db based on product id
router.get('/add_product/:productid', function(req, res) {
  var baseurl = req.params.base;
  var productId = req.params.productid;

  if (req.session.user) {

    basketDB.getProductPrice(productId, (err, rows) =>{
      if (err) {
        console.log("Unable to get price.");
      } else {
        //PARSING THE INT
        var price = rows.price;
        var newprice = price.substr(1);
        var intprice = parseInt(newprice);
        // push product they bought to their basket in session
        req.session.userBasket["products"].push({
          productid: productId,
          productprice: intprice
        });
        // increase the price in their session based on what they add to basket
        req.session.userBasket["total_price"] += intprice;
        res.redirect("/products");
      }
    });
  } else {
    console.log("NOT LOGGED IN");
    res.render('products', {
      layout: 'product_head',
      error: true,
      errormessage: "You must be logged in to purchase products FROM PRODUCTS"
    });
  }
});

module.exports = router;
