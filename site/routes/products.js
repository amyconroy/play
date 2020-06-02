var express = require('express');
var router = express.Router();
var productsDB = require('./products_db.js');

router.get('/', function(req, res){
  productsDB.getAllCategories(err, rows =>{
      if(rows){
        console.log("got all categories");
        // res.render() here
      }
      else{
        console.log("did not get all categories");
        // diff ress render?
      }
    });
  res.render('products', {layout : 'product_head'});
});


router.get('/allProducts', function(req, res){
  productsDB.getAllProducts(err, rows =>{
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


router.get('/category', function(req, res){
  productsDB.getProductsByCategory(req.body.categoryId, (err, rows) =>{
    if(rows){
      console.log("got all products by category");
      // res.render() here
    }
    else{
      console.log("did not get all products by category");
      // diff ress render?
    }
  });
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
