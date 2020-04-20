var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
//var db = require('./database.js');
var sqlite3 = require('sqlite3').verbose();
var port = 8080;
var md5 = require('md5'); // use for creating a hash for passwords
var bodyParser = require('body-parser');

let db = new sqlite3.Database('Play.db', sqlite3.OPEN_READWRITE, (err) => {
  if(err) {
    console.error(err.message);
  }
  console.log('Connected to the PLAY database.');
});


function newUser(params){
  db.run('INSERT INTO User VALUES (?, ?, ?)', params, function(err) {
    if(err){
        return console.error(err.message);
      }
      console.log('Rows insterted ${this.changes}');
    });
}

function newOrder(params){
  db.run('INSERT INTO Order VALUES (?, ?, ?, ?, ?)', params, function(err) {
    if(err){
        return console.error(err.message);
      }
      console.log('Rows insterted ${this.changes}');
    });
}

function newOrderDetails(params){
  db.run('INSERT INTO Order Details VALUES (?, ?, ?, ?)', params, function(err) {
    if(err){
        return console.error(err.message);
      }
      console.log('Rows insterted ${this.changes}');
    });
}

function getProductCategory(params){
  db.run('SELECT categoryName FROM Product Category JOIN Product ON ProductID WHERE ProductId = (?)', params, function(err){
    if(err){
        return console.error(err.message);
      }
      console.log('Rows insterted ${this.changes}');
    });
}

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

app.get('/', (req, res) => {
	res.render('main', {layout : 'index_head'});
});

app.get('/index', (req, res) => {
	res.render('main', {layout : 'index_head'});
});

app.get('/demo', (req, res) => {
  res.render('demo', {layout : 'index_head'});
});

app.get('/products', (req, res) => {
	res.render('products', {layout : 'product_head'});
});

app.get('/login', (req, res) => {
	res.render('login', {layout : 'login_head'});
});

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


/*
router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});
router.get("/",function(req,res){
  res.sendFile(path + "index.html");
  console.log("render this biatch");
  res.render('home', {layout: 'index', template: 'home-template'});
});
router.get("/demo",function(req,res){
  res.sendFile(path + "demo.html");
});
router.get("/login",function(req,res){
  res.sendFile(path + "login.html");
});
router.get("/products",function(req,res){
  res.sendFile(path + "products.html");
});
//app.use("/",router);
app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});*/

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
});*/

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

db.close((err) => {
  if(err){
    console.error(err.message);
  }
  console.log('Closed the database connection.');
});

module.exports = app;
