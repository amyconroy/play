var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  console.log(req.session.user);
  console.log(req.sessionID);

  res.render('downloads', {layout : 'download_head'});
});

module.exports = router;
