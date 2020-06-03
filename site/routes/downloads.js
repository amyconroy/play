var express = require('express');
var router = express.Router();
var downloadsDB = require('./downloads_db.js');

router.get('/', function(req, res){
  console.log(req.session.user);
  console.log(req.sessionID);

  var downloadsCatArr = [];

  getAllCategories(function(downloadsCatArr) {
    if(downloadsCatArr){
      res.render('downloads', {
        layout: 'download_head',
        category: downloadsCatArr
      });
    }
  });
});

var getAllCategories = function getAllCategories(callback){
  var categoriesArray = [];

  downloadsDB.getAllCategories((error, rows) => {
      if (error) {
        console.log(error);
      }
      if(rows){
        var category = {
          category: rows.categoryId,
          categoryName: rows.categoryName,
          categoryDescription: rows.categoryDescription
        };
        console.log(category);
        categoriesArray.push(category);
      }
      else{
        console.log("shit from products");
      }
    });

    callback(categoriesArray);
}


router.get('/:categoryid', function(req, res){
  console.log(req.session.user);
  console.log(req.sessionID);
// downloads by category
  var byCatArr = [];
  var catId = req.params.categoryid;
  console.log("YEET category");
  console.log(catId);

  getDownloadsByCategory(function(catId, byCatArr) {
    if(byCatArr){
      res.render('downloads', {
        layout: 'download_head',
        downloads: byCatArr
      });
    }
  });
});

var getDownloadsByCategory = function getDownloadsByCategory(catId, callback){
  var downloadsArray = [];

  downloadsDB.getProductsByCategory(catId, (err, rows) => {
      if (error) {
        console.log(err);
      }
      if(rows){
        var product = {
          productCategory: rows.productCategory,
          productName: rows.name,
          productDescription: rows.description,
          productPrice: rows.price,
          productImage: rows.image,
          productId: rows.productId
        };
        console.log(product);
        categoriesArray.push(product);
      }
      else{
        console.log("shit from downloads");
      }
    });
  callback(downloadsArray);
}

router.get('/allDownloads', function(req, res){
  console.log(req.session.user);
  console.log(req.sessionID);

// downloads by category
  var allDownloads = [];

  getAllDownloads(function(allDownloads) {
    if(allDownloads){
      res.render('downloads', {
        layout: 'download_head',
        downloadsAll: allDownloads
      });
    }
  });
});

var getAllDownloads = function getAllDownloads(callback){
  var downloadsArray = [];

  downloadsDB.getAllProducts((err, rows) => {
      if (err) {
        console.log(err);
      }
      if(rows){
        var product = {
          productCategory: rows.productCategory,
          productName: rows.name,
          productDescription: rows.description,
          productPrice: rows.price,
          productImage: rows.image,
          productId: rows.productId
        };
        console.log(product);
        categoriesArray.push(product);
      }
      else{
        console.log("shit from downloads");
      }
    });
    callback(downloadsArray);
}


module.exports = router;
