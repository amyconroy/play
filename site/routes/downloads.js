var express = require('express');
var router = express.Router();
var downloadsDB = require('./downloads_db.js');


/// PAGE LOADS UP WITH ALL CATEGORIES - view all categories
router.get('/', function(req, res){
  console.log(req.session.user);
  console.log(req.sessionID);

  console.log("inside downloads!");

  var downloadsCatArr = [];

  getAllCategories(function(downloadsCatArr) {

      res.render('downloads', {
        layout: 'download_head',
        userLoggedIn: req.session.user,
        category: downloadsCatArr
      });

  });
});

var getAllCategories = function getAllCategories(callback){
  var categoriesArray = [];

  downloadsDB.getAllCategories((error, rows) => {
      if(rows){
        var category = {
          category: rows.categoryId,
          categoryName: rows.categoryName,
          categoryDescription: rows.categoryDescription,
        };
        categoriesArray.push(category);

      }
    });



  callback(categoriesArray);
}

router.get('/lowtohigh', function(req, res){
  console.log(req.session.user);
  console.log(req.sessionID);
  console.log("LOW TO HIGH");

  var priceLowDownloads = [];

  getLowDownloads(function(priceLowDownloads) {
      res.render('downloads', {
        layout: 'download_head',
        downloads: priceLowDownloads
      });
  });
});

var getLowDownloads = function getLowDownloads(callback){
  var downloadsArray = [];

  downloadsDB.getDownloadsLowtoHigh((err, rows) => {
        console.log(rows);
        console.log("row length!!!");

        var product = {
          productCategory: rows.productCategory,
          productName: rows.name,
          productDescription: rows.description,
          productPrice: rows.price,
          productImage: rows.image,
          productId: rows.productId
        };

        console.log("prod");
        console.log(product);
        downloadsArray.push(product);

    });
  callback(downloadsArray);
}

router.get('/hightolow', function(req, res){
  console.log(req.session.user);
  console.log(req.sessionID);

  var priceHighDownloads = [];

  getHighDownloads(function(priceHighDownloads) {
      res.render('downloads', {
        layout: 'download_head',
        downloads: priceHighDownloads
      });
  });
});

var getHighDownloads = function getHighDownloads(callback){
  var downloadsArray = [];

  downloadsDB.getDownloadsHightoLow((err, rows) => {
        var product = {
          productCategory: rows.productCategory,
          productName: rows.name,
          productDescription: rows.description,
          productPrice: rows.price,
          productImage: rows.image,
          productId: rows.productId
        };
        console.log(product);
        downloadsArray.push(product);
    });
  callback(downloadsArray);
}

router.get('/all', function(req, res){
  console.log("ALL DOWNLOADS");

  var allDownloads = [];

  getAllDownloads(function(allDownloads) {

      res.render('downloads', {
        layout: 'download_head',
        downloads: allDownloads,
        url: "/all"
      });
  });
  console.log("leaving ALL DOWNLOADS");
});

var getAllDownloads = function getAllDownloads(callback){
  var downloadsArray = [];

  downloadsDB.getAllDownloads((err, rows) => {
        var product = {
          productCategory: rows.productCategory,
          productName: rows.name,
          productDescription: rows.description,
          productPrice: rows.price,
          productImage: rows.image,
          productId: rows.productId,
          url:"/all"
        };
        console.log(product);
        downloadsArray.push(product);
    });
    callback(downloadsArray);
}

/// VIEW DOWNLOADS BY CATEGORY ID
router.get('/:categoryid', function(req, res){
  console.log(req.session.user);
  console.log(req.sessionID);
  //downloads by category
  var categoryProducts = [];
  var categoryId = req.params.categoryid;

  getDownloadsByCategory(req.params.categoryid, function(categoryProducts) {
      res.render('downloads', {
        layout: 'download_head',
        downloads: categoryProducts,
      });
  });
});

var getDownloadsByCategory = function getDownloadsByCategory(categoryid, callback) {
  var downloadsArray = [];

  downloadsDB.getDownloadsByCategory(categoryid, (err, rows) => {
      if(rows){
          var product = {
            productCategory: rows.productCategory,
            productName: rows.name,
            productDescription: rows.description,
            productPrice: rows.price,
            productImage: "images/download_text.png", //CHANGE THIS BACK!
            productId: rows.productId
          };
        }
        console.log(product);
        downloadsArray.push(product);
      //}
    });
  callback(downloadsArray);
}

/// VIEW CATEGORY BY DOWNLOADS low to high
router.get('/:categoryid/lowtohigh', function(req, res){
  console.log(req.session.user);
  console.log(req.sessionID);
  //downloads by category
  var lowPriceProducts = [];
  var categoryId = req.params.categoryid;

  getPriceLowByCategory(req.params.categoryid, function(categoryProducts) {
      res.render('downloads', {
        layout: 'download_head',
        downloads: lowPriceProducts,
      });
  });
});

var getPriceLowByCategory = function getPriceLowByCategory(categoryid, callback) {
  var downloadsArray = [];

  downloadsDB.getDownloadsLowtoHighCategory(categoryid, (err, rows) => {
      if (rows) {
        var product = {
          productCategory: rows.productCategory,
          productName: rows.name,
          productDescription: rows.description,
          productPrice: rows.price,
          productImage: "images/download_text.png", //CHANGE THIS BACK!
          productId: rows.productId
        };
        console.log(product);
        downloadsArray.push(product);
      }
    });
  callback(downloadsArray);
}

/// VIEW CATEGORY BY DOWNLOADS low to high
router.get('/:categoryid/hightolow', function(req, res){
  console.log(req.session.user);
  console.log(req.sessionID);
  //downloads by category
  var highPriceProducts = [];
  var categoryId = req.params.categoryid;

  getPriceHighByCategory(req.params.categoryid, function(categoryProducts) {
      res.render('downloads', {
        layout: 'download_head',
        downloads: highPriceProducts,
      });
  });
});

//module.exports.myArrayFunc = function myArrayFunc(ID ,callback

var getPriceHighByCategory = function getPriceHighByCategory(categoryid, callback) {
  var downloadsArray = [];

  downloadsDB.getDownloadsHightoLowCategory(categoryid, (err, rows) => {
      if(rows){
        var product = {
          productCategory: rows.productCategory,
          productName: rows.name,
          productDescription: rows.description,
          productPrice: rows.price,
          productImage: "images/download_text.png", //CHANGE THIS BACK!
          productId: rows.productId
        };
        downloadsArray.push(product);
      }
    });
  callback(downloadsArray);
}

router.get('/:base/add_product/:productid', function(req, res) {

  var baseurl = req.params.base;
  var productId = req.params.productid;

  console.log("WE CAME FROM HERE: "+baseurl);

  req.session.userBasket.push({
    productId: productId
  });

  console.log(req.session.userBasket);
  res.redirect("/downloads/"+baseurl);

});

module.exports = router;
