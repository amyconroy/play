var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('demo', {layout : 'demo_head'});
});

module.exports = router;
