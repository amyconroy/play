var express = require('express');
var router = express.Router();
var downloadsDB = require('./downloads_db.js');
var basketDB = require('./basket_db.js');


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
          url: "/"+rows.categoryId
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
        downloads: priceLowDownloads,
        url:"/lowtohigh"
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
          productId: rows.productId,
          url:"/lowtohigh"
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
        downloads: priceHighDownloads,
        url:"/hightolow"
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
          productId: rows.productId,
          url:"/hightolow"
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
        url: categoryId
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
            productId: rows.productId,
            url:"/"+categoryid
          };
        }
        console.log(product);
        downloadsArray.push(product);
      //}
    });
  callback(downloadsArray);
}

/// VIEW CATEGORY BY DOWNLOADS low to high
router.get('/lowtohigh/:categoryid', function(req, res){
  console.log(req.session.user);
  console.log(req.sessionID);
  //downloads by category
  var lowPriceProducts = [];
  var categoryId = req.params.categoryid;

  getPriceLowByCategory(req.params.categoryid, function(lowPriceProducts) {
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
          productId: rows.productId,
          url:"/lowtohigh/"+categoryid
        };
        console.log(product);
        downloadsArray.push(product);
      }
    });
  callback(downloadsArray);
}

/// VIEW CATEGORY BY DOWNLOADS low to high
router.get('/hightolow/:categoryid', function(req, res){
  console.log(req.session.user);
  console.log(req.sessionID);
  //downloads by category
  var highPriceProducts = [];
  var categoryId = req.params.categoryid;

  getPriceHighByCategory(req.params.categoryid, function(highPriceProducts) {
      res.render('downloads', {
        layout: 'download_head',
        downloads: highPriceProducts,
      });
  });
});



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
          productId: rows.productId,
          url:"/hightolow/"+categoryid
        };
        downloadsArray.push(product);
      }
    });
  callback(downloadsArray);
}

router.get('*/:base/add_product/:productid', function(req, res) {
  //CHECK IF USER LOGGED IN
  if (req.session.user) {

    console.log("LOGGED IN");
    var baseurl = req.params.base;
    var productId = req.params.productid;

    var product = productId;
    basketDB.getProductPrice(product, (err, rows) =>{
      if (err) {
        console.log("cant get price");
      } else {
        console.log("can get price");

        //PARSING THE INT
        var price = rows.price;
        var newprice = price.substr(1);
        var intprice = parseInt(newprice);

        req.session.userBasket["products"].push({
          productid: productId,
        });

        req.session.userBasket["total_price"] += intprice;

        console.log(req.session.userBasket);
        res.redirect("/downloads/"+baseurl);

      }
    });

  } else {
    console.log("NOT LOGGED IN");

    res.render('downloads', {
      layout: 'download_head',
      error: true,
      errormessage: "You must be logged in to purchase products"
    });
  }

});

router.get('*/:base/remove_product/:productid', function(req, res) {
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

  res.redirect("/downloads/"+baseurl);
});

router.get('*/:base/clearbasket', function(req, res) {
  var baseurl = req.params.base;

  console.log("WE CAME FROM HERE: "+baseurl);

  req.session.userBasket = [];

  console.log(productId);
  console.log("EMPTIED BASKET");

  console.log(req.session.userBasket);
  res.redirect("/downloads/"+baseurl);
});


module.exports = router;
