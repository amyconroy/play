var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require('express-handlebars');
var app = express();
var router = express.Router();
var db = require('./database.js');
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
  db.run('INSERT INTO User VALUES (?, ?, ?)', params, function(err){
    if(err){
        return console.error(err.message);
      }
      console.log('Rows insterted ${this.changes}');
    });
}

function newOrder(params){
  db.run('INSERT INTO Order VALUES (?, ?, ?, ?, ?)', params, function(err)){
    if(err){
        return console.error(err.message);
      }
      console.log('Rows insterted ${this.changes}');
    });
}

function newOrderDetails(params){
  db.run('INSERT INTO Order Details VALUES (?, ?, ?, ?)', params, function(err)){
    if(err){
        return console.error(err.message);
      }
      console.log('Rows insterted ${this.changes}');
    });
}

function getProductCategory(params){
  db.run('SELECT categoryName FROM Product Category JOIN Product ON ProductID WHERE ProductId = (?)', params, function(err)){
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('main', {layout : 'index_head'});
});

app.get('/index', (req, res) => {
	res.render('main', {layout : 'index_head'});
});

app.get('/demo', (req, res) => {
  res.render('demo', {layout : 'demo_head'});
});

app.get('/products', (req, res) => {
	res.render('products', {layout : 'product_head'});
});

app.get('/login', (req, res) => {
	res.render('login', {layout : 'login_head'});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
