"use strict";
///// init database /////
const playDB = require('./play_db.js');

/////////////////////////////////////////
///////////// SQL QUERIES ///////////////
/////////////////////////////////////////

//// GET ALL PRODUCTS
/// 'view all products'
exports.getAllDownloads = function(callback){
  var query = "SELECT * FROM Product WHERE productCategory != 1;";
  const db = null;
  playDB.getDB(function(db){
    // use each as all returns everything from db, each runs query first
    db.each(query, (err, rows) =>{
      if(rows){
        callback(null, rows);
      } else{
        callback(error, null); // unable to get products
      }
    });
  });
}

/// GET ALL CATEGORIES
/// 'view all categories'
exports.getAllCategories = function(callback){
  var query = "SELECT * FROM Category WHERE categoryId != 1;";
    // use each as all returns everything from db, each runs query first
  const db = null;
  playDB.getDB(function(db){
    db.serialize(() => {
      db.each(query, (err, rows) =>{
        if(rows){
          callback(null, rows);
        } else{
          callback(error, null); // unable to get products
        }
      });
    });
  });
}

exports.getDownloadsByCategory = function(categoryId, callback){
    var query = "SELECT * FROM Product WHERE productCategory = ?;";
      // use each as all returns everything from db, each runs query first
    const db = null;
    playDB.getDB(function(db){
      db.serialize(() => {
        db.each(query, categoryId, (err, rows) =>{
          if(rows){
            callback(null, rows);
          } else{
            callback(error, null); // unable to get products
          }
        });
      });
    });
}

/// GET PRODUCTS BY PRICE HIGH to LOW
exports.getDownloadsHightoLow = function(callback){
  var query = "SELECT * FROM Product WHERE productCategory != 1 ORDER BY price ASC;";
    // use each as all returns everything from db, each runs query first
  const db = null;
  playDB.getDB(function(db){
    db.serialize(() => {
      db.each(query, (err, rows) =>{
        if(rows){
          callback(null, rows);
        } else{
          callback(error, null); // unable to get products
        }
      });
    });
  });
}

/// GET PRODUCTS BY PRICE LOW to HIGH
exports.getDownloadsLowtoHigh = function(callback){
  var query = "SELECT * FROM Product WHERE productCategory != 1 ORDER BY price DESC;";
    // use each as all returns everything from db, each runs query first
  const db = null;
  playDB.getDB(function(db){
    db.serialize(() =>{
      db.each(query, (err, rows) =>{
        if(rows){
          console.log(rows);
          callback(null, rows);
        } else{
          callback(error, null); // unable to get products
        }
      });
    });
  });
}

/// GET PRODUCTS BY PRICE LOW to HIGH
exports.getDownloadsLowtoHighCategory = function(categoryid, callback){
  var query = "SELECT * FROM Product WHERE productCategory == ? ORDER BY price DESC;";
    // use each as all returns everything from db, each runs query first
  const db = null;
  playDB.getDB(function(db){
    db.serialize(() =>{
      db.each(query, categoryid, (err, rows) =>{
        if(rows){
          console.log(rows);
          callback(null, rows);
        } else{
          callback(error, null); // unable to get products
        }
      });
    });
  });
}

/// GET PRODUCTS BY PRICE HIGH to LOW
exports.getDownloadsHightoLowCategory = function(categoryid, callback){
  var query = "SELECT * FROM Product WHERE productCategory == ? ORDER BY price ASC;";
    // use each as all returns everything from db, each runs query first
  const db = null;
  playDB.getDB(function(db){
    db.serialize(() => {
      db.each(query, categoryid, (err, rows) =>{
        if(rows){
          callback(null, rows);
        } else{
          callback(error, null); // unable to get products
        }
      });
    });
  });
}
