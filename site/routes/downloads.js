var express = require('express');
var router = express.Router();
var downloadsDB = require('./downloads_db.js');


/// PAGE LOADS UP WITH ALL CATEGORIES - view all categories
router.get('/', function(req, res){
  console.log(req.session.user);
  console.log(req.sessionID);

  console.log("here!");

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
          categoryDescription: rows.categoryDescription,
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

////// VIEW ALL DOWNLOADS BY PRICE LOW TO HIGH
router.get('/lowtohigh', function(req, res){
  console.log(req.session.user);
  console.log(req.sessionID);
  console.log("LOW TO HIGH");

// downloads by category
  var priceLowDownloads = [];

  getLowDownloads(function(priceLowDownloads) {
    if(priceLowDownloads){
      res.render('downloads', {
        layout: 'download_head',
        downloads: priceLowDownloads
      });
    }
  });
  console.log("prepare to render");
});

var getLowDownloads = function getLowDownloads(callback){
  var downloadsArray = [];

  downloadsDB.getDownloadsLowtoHigh((err, rows) => {
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
        console.log("prod");
        console.log(product);
        downloadsArray.push(product);
      }
      else{
        console.log("shit from downloads");
      }
    });
  callback(downloadsArray);
}

////// VIEW ALL DOWNLOADS BY PRICE LOW TO HIGH
router.get('/hightolow', function(req, res){
  console.log(req.session.user);
  console.log(req.sessionID);
  console.log("HIGH TO LOW");

// downloads by category
  var priceHighDownloads = [];

  getHighDownloads(function(priceHighDownloads) {
    if(priceHighDownloads){
      res.render('downloads', {
        layout: 'download_head',
        downloads: priceHighDownloads
      });
    }
  });
  console.log("prepare to render");
});

var getHighDownloads = function getHighDownloads(callback){
  var downloadsArray = [];

  downloadsDB.getDownloadsHightoLow((err, rows) => {
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
        downloadsArray.push(product);
      }
      else{
        console.log("shit from downloads");
      }
    });
  callback(downloadsArray);
}

////// VIEW ALL DOWNLOADS
router.get('/all', function(req, res){
  console.log("ALL DOWNLOADS");
// downloads by category
  var allDownloads = [];

  getAllDownloads(function(allDownloads) {
    if(allDownloads){
      res.render('downloads', {
        layout: 'download_head',
        downloads: allDownloads
      });
    }
  });
  console.log("leaving ALL DOWNLOADS");
});

var getAllDownloads = function getAllDownloads(callback){
  var downloadsArray = [];

  downloadsDB.getAllDownloads((err, rows) => {
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
        console.log("all downloads");
        console.log(product);
        downloadsArray.push(product);
      }
      else{
        console.log("shit from downloads");
      }
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
  console.log("cat id");
  console.log(categoryId);

   //auxFunctions.myArrayFunc(req.params.ID ,function(myRenderArray){

  getDownloadsByCategory(req.params.categoryid, function(categoryProducts) {

    console.log("death comes to us all");
    console.log(req.params.categoryid);
    if(categoryProducts){
      res.render('downloads', {
        layout: 'download_head',
        downloads: categoryProducts,
      });
      console.log(categoryProducts+" inside callback");
    }
  });
});

//module.exports.myArrayFunc = function myArrayFunc(ID ,callback

var getDownloadsByCategory = function getDownloadsByCategory(categoryid, callback) {
  var downloadsArray = [];

  downloadsDB.getDownloadsByCategory(categoryid, (err, rows) => {
      if (err) {
        console.log(err);
      }
      if (rows) {
        console.log("new row");

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
      else{
        console.log("shit from downloads");
      }
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
  console.log("cat id");
  console.log(categoryId);

   //auxFunctions.myArrayFunc(req.params.ID ,function(myRenderArray){

  getPriceLowByCategory(req.params.categoryid, function(categoryProducts) {

    console.log("death comes to us all");
    console.log(req.params.categoryid);
    if(lowPriceProducts){
      res.render('downloads', {
        layout: 'download_head',
        downloads: lowPriceProducts,
      });
      console.log(lowPriceProduct +" inside callback");
    }
  });
});

//module.exports.myArrayFunc = function myArrayFunc(ID ,callback

var getPriceLowByCategory = function getPriceLowByCategory(categoryid, callback) {
  var downloadsArray = [];

  downloadsDB.getDownloadsLowtoHighCategory(categoryid, (err, rows) => {
      if (err) {
        console.log(err);
      }
      if (rows) {
        console.log("new row");
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
      else{
        console.log("shit from downloads");
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
  console.log("cat id");
  console.log(categoryId);

  getPriceHighByCategory(req.params.categoryid, function(categoryProducts) {

    if(highPriceProducts){
      res.render('downloads', {
        layout: 'download_head',
        downloads: highPriceProducts,
      });
    }
  });
});

//module.exports.myArrayFunc = function myArrayFunc(ID ,callback

var getPriceHighByCategory = function getPriceHighByCategory(categoryid, callback) {
  var downloadsArray = [];

  downloadsDB.getDownloadsHightoLowCategory(categoryid, (err, rows) => {
      if (err) {
        console.log(err);
      }
      if (rows) {
        console.log("new row");
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
        console.log("yeet");
        console.log(downloadsArray);
      }
      else{
        console.log("shit from downloads");
      }
    });

  callback(downloadsArray);
}


module.exports = router;
