"use strict";
///// init database /////
const playDB = require('./play_db.js');

/////////////////////////////////////////
/// INIT INITIAL TABLES IF NOT EXISTS ///
/////////////////////////////////////////
exports.createCommentsTable = function(){
  const db = null;
  playDB.getDB(function(db){
    db.serialize(() => {
      db.run("CREATE TABLE IF NOT EXISTS Comments("+
        "commentId	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE," +
        "userId	INTEGER NOT NULL," +
        "timePosted	TEXT NOT NULL," +
        "content	TEXT NOT NULL," +
        "FOREIGN KEY(userId) REFERENCES User(userId)" +
        ");")
      });
  });
}

/////////////////////////////////////////
///////////// SQL QUERIES ///////////////
/////////////////////////////////////////

exports.newComment = function(commentDetails){
  var query = "INSERT INTO Comments";
  query += " (userId, timePosted, content) VALUES (?, ?, ?);";
  const db = null;
  playDB.getDB(function(db){
    db.serialize(() => {
      db.run(query, [commentDetails['userId'], commentDetails['timePosted'], commentDetails['content']], function(error){
        if(error){
          console.log(error);
        }
        else{
          console.log("new comment added");
        }
      });
    });
  });
}

exports.getAllComments = function(callback){
    var query = "SELECT * FROM Comments;";
    const db = null;
    playDB.getDB(function(db){
      db.serialize(() => {
      // use each as all returns everything from db, each runs query first
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

exports.getTenRecentComments = function(callback){
    var query = "SELECT User.userName, Comments.content, Comments.timePosted FROM Comments "
    query+= "JOIN User ON Comments.userId = User.userId ORDER BY Comments.commentId DESC LIMIT 10;";
    const db = null;
    playDB.getDB(function(db){
      db.serialize(() => {
        // use each as all returns everything from db, each runs query first
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

exports.deleteComments = function(commentId, callback) {
  var query = "DELETE FROM Comments WHERE commentId = ?;";
  const db = null;
  playDB.getDB(function(db){
    db.serialize(() => {
      // use each as all returns everything from db, each runs query first
      db.each(query, commentId, (err, rows) =>{
        if(err){
          console.log(err);
        }
      });
    });
  });
}
