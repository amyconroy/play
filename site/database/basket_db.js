"use strict";
///// init database /////
const playDB = require('./play_db.js');

/////////////////////////////////////////
///////////// SQL QUERIES ///////////////
/////////////////////////////////////////
//// GET PRODUCT PRICES ////
// used to get price of each product - display to user, calculate total price of order
exports.getProductPrice = function(productId, callback){
  const db = null;
  playDB.getDB(function(db){
    var query = "SELECT price FROM Product WHERE productId = ?;";
      // use each as all returns everything from db, each runs query first
        db.each(query, productId, (err, rows) =>{
          if(rows){
            callback(null, rows);
          } else{
            callback(error, null); // unable to get product price
          }
    });
  });
}

/// CREATE NEW ORDER ///
// this query will just create a basic ORDER for the user
// (products stored separately)
// order details params = {userId, orderPrice, orderDate}
exports.createNewOrder = function(newOrder){
  var query = "INSERT INTO UserOrder";
  query += " (orderUserId, orderDate, orderPrice) VALUES (?, ?, ?);";
  const db = null;
  playDB.getDB(function(db){
    // use each as all returns everything from db, each runs query first
    db.serialize(() => {
      db.run(query, [newOrder['userId'], newOrder['orderDate'], newOrder['orderPrice']], (err, rows)=>{
        if(err){
          console.log(err);
        }
      });
    });
  });
}

/// GET USER ORDER ID ///
// get most recent categoryId to insert into product
exports.getOrderId = function(callback){
  var query = "Select orderId FROM UserOrder ORDER BY orderId DESC LIMIT 1;"
  const db = null;
  playDB.getDB(function(db){
    db.serialize(() => {
      db.all(query, (err, rows) =>{
        if(rows){
          callback(null, rows[0]);
        } else{
          callback(err, null); // unable to get the id
        }
      });
    });
  });
}

/// CREATE ORDER DETAILS JOINING TABLE ///
// params : orderId, productId
exports.addOrderDetails = function(orderDetails){
  var query = "INSERT INTO OrderDetails";
  query += " (orderId, productId) VALUES (?, ?);";
    // use each as all returns everything from db, each runs query first
  const db = null;
  playDB.getDB(function(db){
    db.serialize(() => {
      db.run(query, orderDetails['orderId'], orderDetails['productId'], (err, rows)=>{
        if(err){
          console.log(err);
        }
        else{
          console.log("New order details added.");
        }
      });
    });
  });
}

// GET PRODUCTS PAGE TO CREATE THE BASKET //
// params = product Id
exports.getProductDetails = function(productId, callback){
  var query = "SELECT * FROM Product WHERE productId = ?;";
  const db = null;
  playDB.getDB(function(db){
  // use each as all returns everything from db, each runs query first
    db.each(query, productId, (err, rows) =>{
      if(rows){
        callback(null, rows);
      } else{
        callback(err, null); // unable to get products
      }
    });
  });
}

/// SELECT DETAILS FOR THE RECEIPT ///
// may have to split in two .. .one that gets the order details, one
// that gets all the products
// receipt Params : orderId
exports.getReceipt = function(orderId, callback){
  var query = "SELECT Product.name AS name, Product.price AS price,";
  query += "Product.image AS image, UserOrder.orderId AS orderid,";
  query += "UserOrder.orderDate AS date, UserOrder.orderPrice AS totalPrice ";
  query += "FROM OrderDetails ";
  query += "INNER JOIN UserOrder ON UserOrder.orderId = OrderDetails.orderId ";
  query += "INNER JOIN Product ON Product.productId = OrderDetails.productId ";
  query += "WHERE UserOrder.orderId = ?;";
    // use each as all returns everything from db, each runs query first
  const db = null;
  playDB.getDB(function(db){
    db.serialize(() => {
      db.all(query, orderId, (err, rows)=>{
        if(rows){
          callback(null, rows);
        } else{
          callback(err, null); // unable to find the user order
        }
      });
    });
  });
}
