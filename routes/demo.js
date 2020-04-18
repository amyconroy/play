var express = require('express');
var router = express.Router();

router.get('/demo', function(req, res, next){
  res.send('demo', { title: 'Express'});
});

module.exports = router; 
