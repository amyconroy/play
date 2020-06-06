var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('payment', {
      layout : 'index_head',
      userLoggedIn: req.session.user
  });
});

module.exports = router;
