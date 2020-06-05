var express = require('express');
var router = express.Router();
var loginDB = require('./login_db.js');
var bcrypt = require('bcrypt');

router.get('/', function(req, res){
    res.render('login', {
        layout : 'login_head'
    });
});

// SET SESSION TO NULL IN DB?
router.get('/logout', function(req, res) {
    req.session.destroy(function(){
      console.log("user logged out.");
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
      console.log("registration failed");

      res.render('login', {
        layout : 'login_head',
        error: 'true',
        errormessage:'Your password should contain a capital, special character, and a number'
      });

    } else {

      var salt = bcrypt.genSaltSync(10); //make salt for password hash
      var hashedPassword = bcrypt.hashSync(password, salt); //make hashed password

      var newUser = {
        email: email,
        username: username,
        password: hashedPassword,
        userSession: req.sessionID //recording their unique sessionID
      }

      loginDB.newUser(newUser); //try to add new user to DB

      req.session.user = { //initialise a session for our user
        email: email,
        name: username,
      }

      req.session.loggedIn = true;

      console.log(req.session.user);
      console.log(req.sessionID);

      res.redirect('/index');
    }

  } else {
    console.log("pass wrong");
    console.log("Password doesn't match");

    res.render('login', {
      layout : 'login_head',
      error: 'true',
      errormessage:'Your confirmed password should match'
    });

  }

});

function validPass(password) { //make sure password is strong
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
      console.log("user does not exist");

      res.render('login', { //user does not exist render error
        layout : 'login_head',
        error: 'true',
        errormessage:'User does not exist'
      });

    } else {

      if (rows.length > 0) {
          console.log("checking password");
          console.log(rows[0].userPassword);

          passCompare(password, rows[0].userPassword, (error, result) => {
            if (result) {
              console.log("SETTING SESSION");

              //req.sessionID = rows[0].userSession; //setting the session?

              req.session.user = {
                email: rows[0].userEmail,
                name: username,
              }

              req.session.loggedIn = true;

              console.log(req.session.user);
              console.log(req.sessionID);

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
  console.log("comparing pass "+password+" and "+userpassword);

  bcrypt.compare(password, userpassword, function(error, result) {
    if (error) {
      callback(error,null);
    } else {
      callback(null, result);
    }
  });
}

module.exports = router;
