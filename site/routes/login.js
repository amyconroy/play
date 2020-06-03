var express = require('express');
var router = express.Router();
var loginDB = require('./login_db.js');
var bcrypt = require('bcrypt');

router.get('/', function(req, res){
    res.render('login', {layout : 'login_head'});
});

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

//  isEmail.validate(email, 'Please input a valid email address');
if (confirm_password === password) { //check password validity
  if (!validPass(password)) {
    console.log("reg failed message");
    res.status("401");
    res.redirect('/login'); //this is hack, not sure how else to deal apart from maybe a clientside callback? or render
  }

  var salt = bcrypt.genSaltSync(10); //make salt for password hash
  var hashedPassword = bcrypt.hashSync(password, salt); //make hashed password

  console.log(hashedPassword);

  var newUser = {
    email: email,
    username: username,
    password: hashedPassword,
    userSession: req.sessionID
  }

  console.log("adding new user "+newUser);
  loginDB.newUser(newUser); //try to add new user to DB

  console.log(req.sessionID+" unique sesh id");

  req.session.user = {
    email: email,
    name: username
  }

  console.log(req.session.user);
  console.log(req.sessionID);

  //res.send("request recieved, registering with info: "+username+password+confirm_password+email);
  res.redirect('/index');

} else {
  console.log("pass wrong");
  res.status("401");
  res.redirect('/login');

}

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

  var userAuth = loginDB.getUserByUserName(username, (error, rows) => {
    if (error) {
      console.log("cant get thing"); //flash user does not exist
    }

    if (rows) {
        //req.session.name = username;
        console.log("checking password");
        console.log(rows.userPassword);

        passCompare(password, rows.userPassword, (error, result)=> {
          if (result) {
            console.log("passmatch");

            req.sessionID = rows.userSession;

            req.session.user = {
              email: rows.userEmail,
              name: username
            }

            console.log(req.session.user);
            console.log(req.sessionID);

          } else {
            console.log("incorrect message");
          }

        });
    }

  });


  //res.send("request recieved cap'n, with: "+username+" "+password);
  res.redirect('/index');
});

function passCompare(password, userpassword, callback) {
  console.log("comparing pass");

  bcrypt.compare(password, userpassword, function(error, result) {
    if (error) throw error;
    callback(null, result);
  });
}

module.exports = router;
