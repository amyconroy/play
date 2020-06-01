var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router(); //our router for requests
//var db = require('./database.js');
var sqlite3 = require('sqlite3').verbose();
var port = 8080;
var md5 = require('md5'); // use for creating a hash for passwords, need to change to SHA-1
var bodyParser = require('body-parser');

app.engine( 'handlebars', handlebars( {
  defaultLayout:'index',
  extname: '.handlebars',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials/'
}));

app.listen(port, "localhost");
console.log("Visit http://localhost:8080/");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// static delivery of public folder
app.use(logger('dev'));
//for post requests
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routing for requests

var indexRoute = require('./routes/index.js');
var demoRoute = require('./routes/demo.js');
var loginRoute = require('./routes/login.js');
var commentsRoute = require('./routes/comments.js');
var productsRoute = require('./routes/products.js');
var downloadsRoute = require('./routes/downloads.js');

app.use('/', indexRoute);
app.use('/demo', demoRoute);
app.use('/products', productsRoute);
app.use('/login', loginRoute);
app.use('/downloads', downloadsRoute);
app.use('/comments', commentsRoute);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

///// init database /////
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

/*app.post('/auth', (req, res) => {
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
});*/




module.exports = app;
