var express = require('express');
var router = express.Router();
var loginDB = require('./login_db.js');

router.get('/', function(req, res){
    res.render('login', {layout : 'login_head'});
});

//the post request for url validation would go here
router.post('/register', function(req, res){
  var username = req.body.register_user;
  var password = req.body.register_password;
  var confirm_password = req.body.conf_password;
  var email = req.body.register_email;

//  isEmail.validate(email, 'Please input a valid email address');
  if (confirm_password === password) { //check password validity
    if (!validPass(password)) {
      res.redirect('/login'); //this is hack, not sure how else to deal apart from maybe a clientside callback? or render
    }
    // password check / valid email etc
    var newUser = {
      email: email,
      username: username,
      password: password,
      userSession: 1
    }
    loginDB.newUser(newUser);
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

router.post('/auth', function(req, res){
    var username = req.body.username;
	  var password = req.body.password;
    res.send("request recieved cap'n, with: "+username+" "+password);

    //should be a basic normal select here

});

module.exports = router;
