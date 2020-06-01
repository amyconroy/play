///// init database /////
var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('Play.db', sqlite3.OPEN_READWRITE, (err) => {
  if(err) {
    console.error(err.message);
  }
  console.log('Connected to the PLAY database.');
});

//////////////////////////
/// CREATE USER TABLE ////
/////////////////////////
exports.createUserTable = function(){
  db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS User ("+
	   "userName	TEXT NOT NULL UNIQUE," +
	   "userEmail	TEXT NOT NULL UNIQUE,"+
	   "userPassword	TEXT NOT NULL," +
	   "userSession	TEXT," +
	   "userId	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE" +
     ");");
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
  query += " (userName, userEmail, userPassword, userSession) VALUES (?, ?, ?, ?));";
  //  db.serialize(() => {
      db.run(query, [newUser['username'], newUser['email'], newUser['password'], 'one'], (err, rows) => {
        if(err){
          console.log(err);
        } else{
            console.log("helo");
        }
      });
  //  });
}


////////////////
/// GET USER ///
////////////////
/// CALLBACK : error, user - error to be set NULL if all good, user NULL if bad
exports.getUserByUserName = function(username, callback){
  var query = "SELECT * FROM User WHERE userName = ?;";
  db.serialize(() => {
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
