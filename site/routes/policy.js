var express = require('express');
var router = express.Router();

router.get('/policy', function(req, res) {
  res.render('policy', {layout : 'policy_head'});
});
