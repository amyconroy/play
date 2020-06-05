///// init database /////
var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('Play.db', sqlite3.OPEN_READWRITE, (err) => {
  if(err) {
    console.error(err.message);
  }
  console.log('Connected to the PLAY database in products.');
});


/////////////////////////////////////////
///////////// SQL QUERIES ///////////////
/////////////////////////////////////////

// order calc param = {[productId, qty]}
/////////////////////////////
//// GET PRODUCT PRICES ////
////////////////////////////
// used to get price of each product - display to user, calculate total price of order
exports.getAllDownloads = function(productId, callback){
  var query = "SELECT price FROM Product WHERE productId = ?;";
    // use each as all returns everything from db, each runs query first
    db.each(query, productId, (err, rows) =>{
      if(rows){
        callback(null, rows);
      } else{
        callback(error, null); // unable to get product price
      }
  });
}

/////////////////////////
/// CREATE NEW ORDER ///
////////////////////////
// this query will just create a basic ORDER for the user
// (products stored separately)
// order details params = {userId, orderPrice}
