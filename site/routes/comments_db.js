///// init database /////
var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('Play.db', sqlite3.OPEN_READWRITE, (err) => {
  if(err) {
    console.error(err.message);
  }
  console.log('Connected to the PLAY database in products.');
});

/////////////////////////////////////////
/// INIT INITIAL TABLES IF NOT EXISTS ///
/////////////////////////////////////////
exports.createCommentsTable = function(){
  db.serialize(() => {
    console.log("comment creating");
    db.run("CREATE TABLE IF NOT EXISTS Comments("+
      "commentId	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE," +
      "userId	INTEGER NOT NULL," +
      "timePosted	TEXT NOT NULL," +
      "content	TEXT NOT NULL," +
      "FOREIGN KEY(userId) REFERENCES User(userId)" +
      ");")
        console.log("comment created");
  });
}

/////////////////////////////////////////
///////////// SQL QUERIES ///////////////
/////////////////////////////////////////

exports.newUser = function(newUser){
  var query = "INSERT INTO User";
  query += " (userName, userEmail, userPassword, userSession) VALUES (?, ?, ?, ?);";
    db.serialize(() => {
      db.run(query, [newUser['username'], newUser['email'], newUser['password'], newUser['userSession']], function(error) {
        if(error){
          console.log("test");
          console.log(error);
        }
        else{
          console.log("successfully inserted user");
        }
    });
  });
}

// time posted - calculate at client side
/*comment{
  userId: x,
  timePosted: now(),
  content: x
} */
exports.newComment = function(commentDetails){
  var query = "INSERT INTO Comments";
  query += "(userId, timePosted, content) VALUES (?, ?, ?);";
  db.seralize(() => {
    db.run(query, [commentDetails['userId'], timePosted['timePosted'], content['content']], function(error){
      if(error){
        console.log(error);
      }
      else{
        console.log("new comment added");
      }
    });
  });
}

exports.getAllComments = function(callback){
    var query = "SELECT * FROM Comments;";
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
}

exports.getTenRecentComments = function(callback){
    var query = "SELECT * FROM Comments ORDER BY timePosted DESC LIMIT 10;";
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
}

exports.deleteComment(commentId, callback){
  var query = "DELETE FROM Comments WHERE commentId = ?;";
  db.serialize(() => {
    // use each as all returns everything from db, each runs query first
    db.each(query, commentId, (err, rows) =>{
      if(err){
        console.log(err);
      }
   });
  });
}
