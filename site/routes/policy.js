"use strict";
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('policy', {layout : 'policy_head'});
});

module.exports = router;
