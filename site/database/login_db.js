"use strict";
///// init database /////
const playDB = require('./play_db.js');

/////////////////////////////////////////
///////////// SQL QUERIES ///////////////
/////////////////////////////////////////

//////////////////////////
/// CREATE USER TABLE ////
/////////////////////////
exports.createUserTable = function(){
  const db = null;
  playDB.getDB(function(db){
    db.serialize(() => {
      db.run("CREATE TABLE IF NOT EXISTS User ("+
	     "userName	TEXT NOT NULL UNIQUE," +
	      "userEmail	TEXT NOT NULL UNIQUE,"+
	      "userPassword	TEXT NOT NULL," +
	      "userSession	TEXT," +
	      "userId	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE" +
        ");");
      });
  });
}

///////////////////////
/// CREATE NEW USER ///
//////////////////////

// CHANGE THE SESSION ID
/// PARAM: user variable
exports.newUser = function(newUser){
  var query = "INSERT INTO User";
  query += " (userName, userEmail, userPassword, userSession) VALUES (?, ?, ?, ?);";
  const db = null;
  playDB.getDB(function(db){
    db.serialize(() => {
      db.run(query, [newUser['username'], newUser['email'], newUser['password'], newUser['userSession']], function(error) {
        if(error){
          console.log(error);
        }
      });
    });
  });
}


////////////////
/// GET USER ///
////////////////
/// CALLBACK : error, user - error to be set NULL if all good, user NULL if bad
exports.getUserByUserName = function(username, callback){
  var query = "SELECT * FROM User WHERE userName = ?;";
  const db = null;
  playDB.getDB(function(db){
    db.serialize(() => {
    // use each as all returns everything from db, each runs query first
      db.all(query, username, (err, rows) =>{
        if(rows){
          // return error as null as got data back
          callback(null, rows);
        } else{
          callback(error, null);
        }
      });
   });
  });
}

exports.getUserByParameter = function(username, email, callback){
  var query = "SELECT * FROM User WHERE userName = ? OR userEmail = ?;";
  const db = null;
  playDB.getDB(function(db){
    db.serialize(() => {
      // use each as all returns everything from db, each runs query first
      db.all(query, username, email, (err, rows) =>{
        if(rows){
          // return error as null as got data back
          callback(null, rows);
        } else{
          callback(error, null);
        }
      });
   });
  });
}
