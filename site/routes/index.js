"use strict";
var express = require('express');
var router = express.Router();

// get home page
router.get('/', function(req, res) {

  res.render('main', {
      layout : 'index_head',
      userLoggedIn: req.session.user
  });
});

//export the module to use in index.js
module.exports = router;
