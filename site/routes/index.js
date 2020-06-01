var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('main', {layout : 'index_head'});
});

//export the module to use in index.js
module.exports = router;
