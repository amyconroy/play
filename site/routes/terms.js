"use strict";

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('terms', {layout : 'terms_head'});
});

module.exports = router;
