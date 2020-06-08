"use strict";

var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  console.log(req.session.user);
  console.log(req.sessionID);

  res.render('demo', {
    layout : 'demo_head',
    userLoggedIn: req.session.user
  });
});

module.exports = router;
