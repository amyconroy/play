///// init database /////
var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('Play.db', sqlite3.OPEN_READWRITE, (err) => {
  if(err) {
      console.log("catching this errror in fill db?");
    console.error(err.message);
  }
  console.log('Connected to the PLAY database in fill db.');
});

const user = require('./routes/login_db.js');
const products = require('./routes/products_db.js');

exports.createTables = function(){
  try{
      console.log("users creating fill");
    user.createUserTable();
      console.log("category creating fill");
    products.createCategoryTable();
      console.log("order creating fill");
    products.createOrderTable();
      console.log("product creating fill");
    products.createProductTable();
      console.log("order deets creating fill");
    products.createOrderDetailsTable();
  //  db.close();
  } catch(error){
    console.log("catching this errror in create tables?");
    console.log(error);
  //  db.close();
  }
}

// CHANGE THE SESSION ID
/// PARAM: user variable (JSON AS PER BELOW)
/// JSON:
// var user = {'email': req.body.email,
            // 'username': req.body.username,
            // 'password' : hashedPassword };


exports.fillUsers = function(){
  var email = ['admin@admin.com', 'amy@bris.com', 'ana@bris.com', 'olaf@bris.com'];
  var userName = ['admin', 'amy', 'ana', 'olaf'];
  var password = ['admin', 'anarocks', 'amyrocks', 'summer'];

  for(var i = 0; i < 4; i++){
    console.log("yeet");
    newuser = {
      email: email[i],
      username: userName[i],
      password: password[i],
      userSession: i
    }
    user.newUser(newuser);
  }
}
