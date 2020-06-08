var express = require('express');
var router = express.Router();
var basketDB = require('./basket_db.js');


router.get('/', function(req, res) {
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

// get products in the basket from the session
var getProducts = function getProducts(orderDetails, callback){
  var orderProductArray = [];

  for(var i = 0; i < orderDetails.length; i++){
    var productId = orderDetails[i].productid;

// get all the details of the products to render basket
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
    });
  }
  callback(orderProductArray);
}


router.get('/remove_product/:productid', function(req, res) {
  var baseurl = req.params.base;
  var productId = req.params.productid;

  var products = req.session.userBasket['products'];

// find matching productId in the users basket
  for(let i = 0; i < products.length; i++){
    var item = products[i].productid;
    if(item === productId){
      products.splice(i, 1);
      // remove price of item from the total price in session
      req.session.userBasket['total_price'] -= products[i].productprice;
    }
  }
  req.session.userBasket['products'] = products;

  res.redirect('/basket');
});

// completely set basket in session to be empty
router.get('/clearbasket', function(req, res) {
  var baseurl = req.params.base;

  req.session.userBasket['products'] = [];
  req.session.userBasket['total_price'] = 0;

  res.redirect('/basket');
});


module.exports = router;
