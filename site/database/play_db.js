"use strict";
var sqlite3 = require('sqlite3').verbose();
var db = null; 

// only called once when server starts up, to avoid opening db multiple times
var startDB = function(){
  db = new sqlite3.Database('./database/Play.db', sqlite3.OPEN_READWRITE, (err) => {
    if(err) {
      console.error(err.message);
    }
    console.log('Connected to the PLAY database.');
  });
}

var closeDB = function(){
  db.close((err) =>{
      if(err){
        console.error(err.message);
      }
      console.log('Closed PLAY database.');
    });
}


var getDB = function(callback){
  if(db == null){
    startDB();
  }
  callback(db);
}

// to be used by database js
module.exports = {
  startDB,
  closeDB,
  getDB,
};
