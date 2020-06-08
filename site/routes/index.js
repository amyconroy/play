"use strict";

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.session.user+" from index");
  console.log(req.sessionID + " from index");
  console.log(req.session.loggedIn);

  res.render('main', {
      layout : 'index_head',
      userLoggedIn: req.session.user
  });
});

//export the module to use in index.js
module.exports = router;
