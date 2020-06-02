var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  console.log(req.session.name);
  res.render('products', {layout : 'product_head'});
});

module.exports = router;
