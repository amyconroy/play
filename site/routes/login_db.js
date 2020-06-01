///// init database /////
var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('Play.db', sqlite3.OPEN_READWRITE, (err) => {
  if(err) {
    console.error(err.message);
  }
  console.log('Connected to the PLAY database.');
});


// here add in hashing / inserting dummy users / etc

///// sqlite queries /////
const user_select_username = db.prepare('SELECT * FROM User WHERE userName = ?');
const user_create          = db.prepare('INSERT INTO User (userName, userEmail, userPassword, userSession) VALUES (?, ?, ?, ?);');
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

app.post('/auth', (req, res) => {
  var username = req.body.username;
	var password = req.body.password;
  res.send("request recieved cap'n, with: "+username+" "+password);

  //should be a basic normal select here
});

app.post('/register', (req, res) => {
  var username = req.body.register_user;
	var password = req.body.register_password;
  var confirm_password = req.body.conf_password;
  var email = req.body.register_email;

  if (confirm_password === password) { //check password validity
    if (!validPass(password)) {
      res.redirect('/login'); //this is hack, not sure how else to deal apart from maybe a clientside callback? or render
    }

    res.send("request recieved, registering with info: "+username+password+confirm_password+email);
  } else {
    res.redirect('/login');
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
