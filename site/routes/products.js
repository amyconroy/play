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

module.exports = router;
