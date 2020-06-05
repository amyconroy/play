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
    if(downloadsCatArr.length > 0){
      res.render('downloads', {
        layout: 'download_head',
        userLoggedIn: req.session.user,
        category: downloadsCatArr
      });
    }
    else{
      console.log("Can't get categories. Redirect 404");
      res.status(404).render('error', {
        layout: 'index_head',
        errorMessage: "Page not found!",
        error: "Error 404!"
      });
    }
  });
});

var getAllCategories = function getAllCategories(callback){
  var categoriesArray = [];

  downloadsDB.getAllCategories((error, rows) => {
      if(error || rows.length == 0){
        console.log(error);
      }
      else if(rows.length > 0){
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

////// VIEW ALL DOWNLOADS BY PRICE LOW TO HIGH
router.get('/lowtohigh', function(req, res){
  console.log(req.session.user);
  console.log(req.sessionID);
  console.log("LOW TO HIGH");

// downloads by category
  var priceLowDownloads = [];

  getLowDownloads(function(priceLowDownloads) {
    // in case nothing is returned
    if(priceLowDownloads.length > 0){
      res.render('downloads', {
        layout: 'download_head',
        downloads: priceLowDownloads
      });
    }
    else if(priceLowDownloads.length == 0){
      console.log("Error getting low to high downloads. Redirect 404");
      res.status(404).render('error', {
        layout: 'index_head',
        errorMessage: "Page not found!",
        error: "Error 404!"
      });
    }
  });
});

var getLowDownloads = function getLowDownloads(callback){
  var downloadsArray = [];

  downloadsDB.getDownloadsLowtoHigh((err, rows) => {
      if(err || rows.length > 0){
        console.log(err);
      }
      else if(rows.length > 0){
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
    });
  callback(downloadsArray);
}

////// VIEW ALL DOWNLOADS BY PRICE LOW TO HIGH
router.get('/hightolow', function(req, res){
  console.log(req.session.user);
  console.log(req.sessionID);

// downloads by category
  var priceHighDownloads = [];

  getHighDownloads(function(priceHighDownloads) {
    if(priceHighDownloads.length > 0){
      res.render('downloads', {
        layout: 'download_head',
        downloads: priceHighDownloads
      });
    }
    else{
      console.log("Can't get price high to low downloads. Redirect 404");
      res.status(404).render('error', {
        layout: 'index_head',
        errorMessage: "Page not found!",
        error: "Error 404!"
      });
    }
  });
});

var getHighDownloads = function getHighDownloads(callback){
  var downloadsArray = [];

  downloadsDB.getDownloadsHightoLow((err, rows) => {
      if(err || rows.length == 0){
        console.log(err);
      }
      else if(rows.length > 0){
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
    });
  callback(downloadsArray);
}

////// VIEW ALL DOWNLOADS
router.get('/all', function(req, res){
  console.log("ALL DOWNLOADS");
// downloads by category
  var allDownloads = [];

  getAllDownloads(function(allDownloads) {
    if(allDownloads.length > 0){
      res.render('downloads', {
        layout: 'download_head',
        downloads: allDownloads
      });
    }
    else{
      console.log("Can't get all. Redirect 404");
      res.status(404).render('error', {
        layout: 'index_head',
        errorMessage: "Page not found!",
        error: "Error 404!"
      });
    }
  });
  console.log("leaving ALL DOWNLOADS");
});

var getAllDownloads = function getAllDownloads(callback){
  var downloadsArray = [];

  downloadsDB.getAllDownloads((err, rows) => {
      if(err || rows.length == 0){
        console.log(err);
      }
      else if(rows.length > 0){
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
  //auxFunctions.myArrayFunc(req.params.ID ,function(myRenderArray){

  getDownloadsByCategory(req.params.categoryid, function(categoryProducts) {
    // if what's returned has no rows / null - does not exist
    if(categoryProducts.length == 0 || categoryProducts == null){
      console.log("Category does not exist. Redirect 404");
      res.status(404).render('error', {
        layout: 'index_head',
        errorMessage: "Page not found!",
        error: "Error 404!"
      });
    }
    else if(categoryProducts.length > 0){
      res.render('downloads', {
        layout: 'download_head',
        downloads: categoryProducts,
      });
    }
  });
});

//module.exports.myArrayFunc = function myArrayFunc(ID ,callback

var getDownloadsByCategory = function getDownloadsByCategory(categoryid, callback) {
  var downloadsArray = [];

  downloadsDB.getDownloadsByCategory(categoryid, (err, rows) => {
      // make sure that category id exists
      if(err || rows.length == 0){
        downloadsArray = null;
        callback(donwloadsArray);
      }
      else if(rows){
        // make sure that category id exists
        if(rows.length > 0){
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

  getPriceLowByCategory(req.params.categoryid, function(categoryProducts) {

    if(lowPriceProducts.length > 0){
      res.render('downloads', {
        layout: 'download_head',
        downloads: lowPriceProducts,
      });
    }
    else{
      console.log("Can't get low to high category. Redirect 404");
      res.status(404).render('error', {
        layout: 'index_head',
        errorMessage: "Page not found!",
        error: "Error 404!"
      });
    }
  });
});

var getPriceLowByCategory = function getPriceLowByCategory(categoryid, callback) {
  var downloadsArray = [];

  downloadsDB.getDownloadsLowtoHighCategory(categoryid, (err, rows) => {
      if(err || rows.length == 0){
        console.log(err);
      }
      else if (rows.length > 0){
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

    if(highPriceProducts.length > 0){
      res.render('downloads', {
        layout: 'download_head',
        downloads: highPriceProducts,
      });
    }
    else{
      console.log("Can't get category by price high to low. Redirect 404");
      res.status(404).render('error', {
        layout: 'index_head',
        errorMessage: "Page not found!",
        error: "Error 404!"
      });
    }
  });
});

//module.exports.myArrayFunc = function myArrayFunc(ID ,callback

var getPriceHighByCategory = function getPriceHighByCategory(categoryid, callback) {
  var downloadsArray = [];

  downloadsDB.getDownloadsHightoLowCategory(categoryid, (err, rows) => {
      if(err || rows.length == 0){
        console.log(err);
      }
      else if(rows.length > 0){
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


module.exports = router;
