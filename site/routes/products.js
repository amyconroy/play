var express = require('express');
var router = express.Router();
var productsDB = require('./products_db.js');

router.get('/', function(req, res){
  console.log("FROM PRODUCTS");
  console.log(req.session.user);
  console.log(req.sessionID);

  res.render('products', {
    layout : 'product_head',
    userLoggedIn: req.session.user
  });
});


router.get('/allProducts', function(req, res){
  productsDB.getAllLicenseProducts(err, rows =>{
      if(rows){
        console.log("got all products");
        // res.render() here
      }
      else{
        console.log("did not get all products");
        // diff ress render?
      }
    });
  res.render('products', {layout : 'product_head'});
});


router.get('/viewProduct', function(req, res){
    productsDB.getProductsByCategory(req.body.productId, (err, rows) =>{
    if(rows){
      console.log("got product");
    // res.render() here
    }
    else{
      console.log("did not get product");
    // diff ress render?
    }
  });
});

router.get('/add_product/:productid', function(req, res) {

  var baseurl = req.params.base;
  var productId = req.params.productid;

  console.log("WE CAME FROM HERE: "+baseurl);

  if (req.session.user) {

    console.log("LOGGED IN");
    req.session.userBasket["products"].push({
      productId: productId,
      qnt:5
    });

    console.log(req.session.userBasket);
    res.redirect("/products");

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
