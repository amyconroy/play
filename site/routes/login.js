"use strict";
var express = require('express');
var router = express.Router();
var loginDB = require('../database/login_db.js');
var bcrypt = require('bcrypt');

router.get('/', function(req, res){
    if (req.session.user) {
      res.render('login', {
          layout : 'login_head',
          userLoggedIn: req.session.user
      });

    } else {
      res.render('login', {
          layout : 'login_head'
      });
    }
});

router.get('/logout', function(req, res) {
    req.session.destroy(function(){
      console.log("User logged out.");
    });
    res.redirect('/login');
});

//the post request for url validation would go here
router.post('/register', function(req, res){
  var username = req.body.register_user;
  var password = req.body.register_password;
  var confirm_password = req.body.conf_password;
  var email = req.body.register_email;

  if (confirm_password === password) { //check password validity
    if (!validPass(password)) {
      res.render('login', {
        layout : 'login_head',
        error: 'true',
        errormessage:'Your password should contain a capital, special character, and a number'
      });

    } else { //PASSWORD IS FINE, they can register
      loginDB.getUserByParameter(username, email, (err, rows) => {
        if (rows.length != 0) {
        //CHECK SPECIFIC CASE WHICH MATCHES
          if(rows[0].userEmail == email){
            res.render('login', {
              layout : 'login_head',
              error: 'true',
              errormessage:'An account with this email already exists.'
            });
          } else if(rows[0].userName == username){
            res.render('login', {
              layout : 'login_head',
              error: 'true',
              errormessage:'An account with this username already exists'
            });
          }
        } else {  //USER DOES NOT EXIST, CREATING AND INITIALISING SESSION

          var salt = bcrypt.genSaltSync(10); //make salt for password hash
          var hashedPassword = bcrypt.hashSync(password, salt); //make hashed password

          var newUser = {
            email: email,
            username: username,
            password: hashedPassword,
            userSession: req.sessionID, //recording their unique sessionID
          }
          req.session.loggedIn = true;
          loginDB.newUser(newUser); //try to add new user to DB

          var userAuth = loginDB.getUserByUserName(username, (error, rows) => { //we need id and to add it to cookie session
            var basket = {
              products: [], // PRODUCT OBJECT IS { product_id:ID, qnt:NUMBER }
              total_price: 0
            }

            if (rows.length > 0) {
              req.session.user = { //initialise a session for our user
                email: email,
                name: username,
                userid: rows[0].userId,
              }

              req.session.loggedIn = true;
              req.session.userBasket = basket;
              res.redirect('/index');
            }
          });
        }
      });
    }
  } else { //PASSWORD DOESNT MATCH
    console.log("Password doesn't match");
    res.render('login', {
      layout : 'login_head',
      error: 'true',
      errormessage:'Your confirmed password should match'
    });
  }
});

//make sure password is strong
function validPass(password) {
  if (password.length < 5) {
    return false;
  }
  if (!password.match(/[0-9]/)) {
    return false;
  }
  if (!password.match(/[!@#$%\^&*]/)) {
    return false;
  }
  return true;
}

router.post('/auth', function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  var userAuth = loginDB.getUserByUserName(username, (error, rows) => {
    if (error || rows.length == 0) {
      res.render('login', { //user does not exist render error
        layout : 'login_head',
        error: 'true',
        errormessage:'User does not exist'
      });
    } else {
      if(rows.length > 0){
          passCompare(password, rows[0].userPassword, (error, result) => {
            if (result) {
              var basket = {
                products: [], // PRODUCT OBJECTE IS { product_id:ID, qnt:NUMBER}
                total_price: 0
              }

              req.session.user = {
                email: rows[0].userEmail,
                name: username,
                userid: rows[0].userId,

              }
              req.session.loggedIn = true;
              req.session.userBasket = basket;

              res.redirect('/index'); //SUCCESSFUL LOGIN

          } else {
            res.render('login', {
              layout : 'login_head',
              error: 'true',
              errormessage:'Wrong password'
            });
          }
        });
      }
    }
  });
});

function passCompare(password, userpassword, callback) {
  bcrypt.compare(password, userpassword, function(error, result) {
    if (error) {
      callback(error,null);
    } else {
      callback(null, result);
    }
  });
}

module.exports = router;
