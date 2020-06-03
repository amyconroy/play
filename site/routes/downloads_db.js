var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('Play.db', sqlite3.OPEN_READWRITE, (err) => {
  if(err) {
    console.error(err.message);
  }
  console.log('Connected to the PLAY database in products.');
});

//// GET ALL PRODUCTS
/// 'view all products'
exports.getAllProducts = function(callback){
  var query = "SELECT * FROM Product WHERE productCategory != 1;";
    // use each as all returns everything from db, each runs query first
    db.all(query, (err, rows) =>{
      if(rows){
        callback(null, rows);
      } else{
        callback(error, null); // unable to get products
      }
  });
}

/// GET ALL CATEGORIES
/// 'view all categories'
exports.getAllCategories = function(callback){
  var query = "SELECT * FROM Category WHERE categoryId != 1;";
    // use each as all returns everything from db, each runs query first
    db.serialize(() => {
    db.each(query, categoryId, (err, rows) =>{
      if(rows){
        callback(null, rows);
      } else{
        callback(error, null); // unable to get products
      }
    });
  });
}

exports.getProductsByCategory = function(categoryId, callback){
    var query = "SELECT * FROM Product WHERE productCategory != ?;";
      // use each as all returns everything from db, each runs query first
      db.serialize(() => {
      db.each(query, categoryId, (err, rows) =>{
        if(rows){
          callback(null, rows);
        } else{
          callback(error, null); // unable to get products
        }
      });
    });
}
