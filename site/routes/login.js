var express = require('express');
var router = express.Router();
var loginDB = require('./login_db.js');
var bcrypt = require('bcrypt');

router.get('/', function(req, res){
    res.render('login', {layout : 'login_head'});
});

//the post request for url validation would go here
router.post('/register', function(req, res){
  var username = req.body.register_user;
  var password = req.body.register_password;
  var confirm_password = req.body.conf_password;
  var email = req.body.register_email;

  var saltRounds = 10;
  var hashedPassword;

  /*bcrypt.hash(password, saltRounds, (err, hash) => {
    hashedPassword = hash;
  });
  console.log("from registration, hash "+hashedPassword);*/

  /*var newUser = {
    email: email,
    username: username,
    password: hashedPassword,
    userSession: 123123
  }*/

  /*if (confirm_password === password) { //check password validity
    if (!validPass(password)) {
      console.log("reg failed message");
      res.status("401");
      res.redirect('/login'); //this is hack, not sure how else to deal apart from maybe a clientside callback? or render
    }

    console.log("adding new user "+newUser);
    loginDB.newUser(newUser); //try to add new user to DB

    req.session.name = username; //test session works
    res.send("request recieved, registering with info: "+username+password+confirm_password+email);

  } else {
    console.log("pass not confirmed");
    res.status("401");
    res.redirect('/login');

  }*/

  //sanitise input first
  console.log("checking user password strength");

  var passStrength = validPass(password, (data, error) => {
      if (error) {
        //flash error;
        console.log(error);

        res.status("401");
        res.redirect('/login');
      }
      if (data) {
        console.log("password fine");
        res.send("request recieved, registering with info: "+username+password+confirm_password+email);
      }
  });

});

function validPass(password, callback){
  if (password.length < 5) {
    callback(new Error("pass too short"), null); //false
  }

  if (!password.match(/[0-9]/)) {
    callback(new Error("pass needs number"), null); //false
  }

  if (!password.match(/[!@#$%\^&*]/)) {
    callback(new Error("pass needs special character"), null); //false
  }

  console.log("password fine from val");
  callback(null, "fine"); //true
}

router.post('/auth', function(req, res){
    var username = req.body.username;
	  var password = req.body.password;

    var userAuth = loginDB.getUserByUserName(username, (error, rows) => {
      if (error) {
        console.log("cant get thing"); //flash user does not exist
      }
      if (rows) {
          req.session.name = username;
          console.log("checking password");
          //if (passwordComparison(rows.userPassword, password) {
            //console.log("success");
          //} else {
            //console.log("wrong password"); //flash error ie pass dont match
          //}
      }

    });


    req.session.name = username;
    res.send("request recieved cap'n, with: "+username+" "+password);

});

function passwordComparison(userHash, userInput) {
  //retrieve hash from DB
  //hash the one they gave
  //compare the two
  if (userHash === userInput) {
    return true;
  }
  return false;
}

module.exports = router;
