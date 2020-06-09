//var flash = require('flash');
var createError = require('http-errors'); //change these to constants so cant be changed?
var express = require('express');
var path = require('path');
const port = process.env.PORT || 8080;
var fs = require("fs");
//////////////////////
/// OTHER PACKAGES ///
/////////////////////
var cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
var session = require('express-session');
var logger = require('morgan');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser'); //for post requests
var md5 = require('md5'); // use for creating a hash for passwords, need to change to SHA-1
var bodyParser = require('body-parser');
var helmet = require('helmet'); // for security
var fs = require("fs"); // ban upper case file names
//////////////////
/// EXPRESS /////
/////////////////
var app = express();
var router = express.Router(); //our router for requests

/////////////////////
///// SECURITY //////
/////////////////////
var banned = [];
banUpperCase("./public/", "");

app.use(lower); // put to lower case
app.use(ban); // forbid access to the urls in the banned list

app.use(helmet()); // protects against attacks on express

//////////////////////////////
/// CERTIFICATES and HTTPS ///
//////////////////////////////
const https = require('https');
//https and openSSL setup, self signed certificates so browser will have a 'do you want to accept risk' page
var key = fs.readFileSync(__dirname+"/keys/selfsigned.key"); //get the key/cert generated by openssl
var cert = fs.readFileSync(__dirname+"/keys/selfsigned.crt");
var options = {
  key: key,
  cert: cert
};
var httpsServer = https.createServer(options, app); //create http server on correct port
httpsServer.listen(port, "localhost");

//////////////////////////////
/// HANDLEBARS VIEW ENGINE ///
//////////////////////////////
app.engine( 'handlebars', handlebars( {
  defaultLayout:'index',
  extname: '.handlebars',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials/'
}));
console.log("Visit http(s)://localhost:8080/");
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// static delivery of public folder
app.use(logger('dev'));

///////////////////
/// BODY-PARSER ///
///////////////////
app.use(express.urlencoded({ extended: true })); /// supporting URL-encoded bodies (utf-8)
app.use(bodyParser.json()); // supporting JSON-econded bodies

//cookies for session storage
app.use(cookieParser());
app.use(session({
    genid: function(req) {
      return uuidv4() // use UUIDs for session IDs
    },
    secure:false, //change to secure
    secret: "343ji43j4n3jn4jk3n",
    resave: true,
    saveUninitialized: true,
    unset: 'destroy',
  }));

//////////////////
/// USE LOWER ///
/////////////////
// Make the URL lower case.
function lower(req, res, next) {
    req.url = req.url.toLowerCase();
    next();
}

///////////////
/// ROUTING ///
//////////////

//change here
var indexRoute = require('./routes/index.js');
var demoRoute = require('./routes/demo.js');
var loginRoute = require('./routes/login.js');
var commentsRoute = require('./routes/comments.js');
var productsRoute = require('./routes/products.js');
var downloadsRoute = require('./routes/downloads.js');
var policyRoute = require('./routes/policy.js');
var termsRoute = require('./routes/terms.js');
var basketRoute = require('./routes/basket.js');
var paymentRoute = require('./routes/payment.js');
var receiptRoute = require('./routes/receipt.js');
var faqRoute = require('./routes/faq.js');
app.use('/', indexRoute);
app.use('/index', indexRoute);
app.use('/demo', demoRoute);
app.use('/products', productsRoute);
app.use('/login', loginRoute);
app.use('/downloads', downloadsRoute);
app.use('/comments', commentsRoute);
app.use('/policy', policyRoute);
app.use('/terms', termsRoute);
app.use('/basket', basketRoute);
app.use('/payment', paymentRoute);
app.use('/receipt', receiptRoute);
app.use('/faq', faqRoute);


app.use(express.static(path.join(__dirname, '/public')));
app.use('/login', express.static(__dirname + '/public')); //for error message rendering
app.use('/comments', express.static(__dirname + '/public'));
app.use('/downloads', express.static(__dirname + '/public'));
app.use('/products',express.static(__dirname + '/public'));
app.use('/downloads/lowtohigh', express.static(__dirname + '/public'));
app.use('/downloads/hightolow', express.static(__dirname + '/public'));
app.use('/downloads/*/add_product', express.static(__dirname + '/public'));
app.use('/basket', express.static(__dirname + '/public'));
app.use('/products', express.static(__dirname + '/public'));
app.use('/products/add_product', express.static(__dirname + '/public'));


///downloads/all/add_product/1

///////////////////////////////
/// FILL DB WITH DUMMY DATA ///
///////////////////////////////
const fillDB = require('./filldb.js');
fillDB.createTables();
/* fillDB.fillUsers();
fillDB.fillComments();
fillDB.fillCategories();
fillDB.fillGameProducts();
fillDB.fillAnimationsProducts();
fillDB.fillBackgroundProducts();*/

/////////////////////////////
////// BAN UPPER FILES //////
////////////////////////////
// Forbid access to the URLs in the banned list.
function ban(req, res, next) {
    for (var i=0; i<banned.length; i++) {
        var b = banned[i];
        if (req.url.startsWith(b)) {
            res.status(404).send("Filename not lower case");
            return;
        }
    }
    next();
}

// Check a folder for files/subfolders with non-lowercase names.  Add them to
// the banned list so they don't get delivered, making the site case sensitive,
// so that it can be moved from Windows to Linux, for example. Synchronous I/O
// is used because this function is only called during startup.  This avoids
// expensive file system operations during normal execution.  A file with a
// non-lowercase name added while the server is running will get delivered, but
// it will be detected and banned when the server is next restarted.
function banUpperCase(root, folder) {
    var folderBit = 1 << 14;
    var names = fs.readdirSync(root + folder);
    for (var i=0; i<names.length; i++) {
        var name = names[i];
        var file = folder + "/" + name;
        if (name != name.toLowerCase()) banned.push(file.toLowerCase());
        var mode = fs.statSync(root + file).mode;
        if ((mode & folderBit) == 0) continue;
        banUpperCase(root, file);
    }
}

/////////////////////
//////// 404 ////////
/////////////////////
// set error to be 404 if the page isnt found
app.use(function(req, res, next) {
  console.error("FROM SERVER: page not found");
  res.status(404).render('error', {
    layout: 'index_head',
    errorMessage: "Page not found!",
    error: "Error 404!",
    errorType: "404"
  });
});

/////////////////////
/// ERROR HANDLER ///
////////////////////
// handles all other errors but 404 (page not found)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  console.error(err.message);
  res.status(500).render('error', {
    layout: 'index_head',
    errorMessage: "Something went wrong!",
    error: err,
    errorType: "500"
  });
});

module.exports = app;
