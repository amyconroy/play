"use strict";

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('faq', {layout : 'index_head'});
});

module.exports = router;
