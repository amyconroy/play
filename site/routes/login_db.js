///// init database /////
var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('Play.db', sqlite3.OPEN_READWRITE, (err) => {
  if(err) {
    console.error(err.message);
  }
  console.log('Connected to the PLAY database.');
});

// "CREATE TABLE Category ("+
  //"categoryId	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE," +
  //"categoryName	TEXT NOT NULL UNIQUE," +
  //"categoryDescription	TEXT NOT NULL" +
  //");")

//////////////////////////
/// CREATE USER TABLE ////
/////////////////////////
exports.createUserTable = function(){
  db.seralize(() => {
    db.run("CREATE TABLE IF NOT EXISTS User ("+
	   "userName	TEXT NOT NULL UNIQUE," +
	   "userEmail	TEXT NOT NULL UNIQUE,"+
	   "userPassword	TEXT NOT NULL," +
	   "userSession	TEXT," +
	   "userId	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE" +
     ");";
  });
}

///////////////////////
/// CREATE NEW USER ///
//////////////////////

// CHANGE THE SESSION ID
/// PARAM: user variable (JSON AS PER BELOW)
/// JSON:
// var user = {'email': req.body.email,
            // 'username': req.body.username,
            // 'password' : hashedPassword };

exports.newUser = function(newUser){
  var query = "INSERT INTO User";
  query += "(userName, userEmail, userPassword, userSession) VALUES (?, ?, ?, ?));";
    db.seralize(() => {
      db.run(query, newUser['username'], newUser['email'], newUser['password'], 'one'{
        if(error){
          console.log(error);
        }
      });
    });
}


////////////////
/// GET USER ///
////////////////

/// CALLBACK : error, user - error to be set NULL if all good, user NULL if bad
exports.getUserByUserName = function(username, callback){
  var query = "SELECT * FROM User WHERE userName = ?;";
  db.seralize(() => {
    // use each as all returns everything from db, each runs query first
    db.each(query, username, (err, rows) =>{
      if(rows){
        // return error as null as got data back
        callback(null, rows);
      } else{
        callback(error, null);
      }
    });
  });
}


///// sqlite queries /////
const user_select_username = db.prepare('SELECT * FROM User WHERE userName = ?');
const user_login           = db.prepare('REPLACE INTO User (userName, userEmail, userPassword, userSession) VALUES (?, ?, ?, ?);');
const user_logout          = db.prepare('REPLACE INTO User (userName, userSession) VALUES (?, NULL);');
const user_session         = db.prepare('SELECT * FROM User WHERE userSession = ?');
const user_add_email       = db.prepare('REPLACE INTO User (userName, userEmail) VALUES (?, ?)');
//const order_create         = db.prepare('INSERT INTO Order VALUES (?, ?, ?, ?, ?)');
//const orderDetails_create  = db.prepare('INSERT INTO Order Details VALUES (?, ?, ?, ?)');
//const productCtgy_get      = db.prepare('SELECT categoryName FROM Product Category JOIN Product ON ProductID WHERE ProductId = ?');

///// database functions /////
function newUser(userName, userEmail, userPassword, userPassword2, req){
  if(userPassword == userPassword2) {
    user_select_username.all([userName], (err, rows) => { // first select user and see if they exist
      if(err){
        console.log(err.message);
      }
      if(rows.length == 0){
        user_create.run([userName, userEmail, userPassword, req.sessionID]);
      }});
  }
  else{
    // insert error message for passwords that don't match
  }
}

function userLogin(userName, userPassword, userEmail, sessionID){
  user_select_username.all([username], (err, rows) => {
    if(err){
      // can't find user / not matching password
      console.log(err.message);
    }
    if(rows.length == 0){
      // new user ... create the hash for the password (!!!)
      user_create.run([username, userEmail, userPassword, sessionId]);
    }
  })
}

function userLogout(req) {
  user_session.get([req.sessionID], (err, row) => {
    if(err){
      console.log(err.message);
    }
    user_logout.run(row['userName'], row['userPassword']);
  });
}


  //run a select on the username, if it exists say we need a diff USERNAME
  //insert new user into our shiny db
});

function validPass(password) {
  if (password.length < 5) {
    console.log("pass too short");
    return false;
  }

  if (!password.match(/[0-9]/)) {
    console.log("pass needs number");
    return false;
  }

  if (!password.match(/[!@#$%\^&*]/)) {
    console.log("pass needs special character");
    return false;
  }

  return true;
}
