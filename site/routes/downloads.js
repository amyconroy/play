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

/*
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
}); */

module.exports = router;
