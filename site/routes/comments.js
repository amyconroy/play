var express = require('express');
var router = express.Router();
var commentsDB = require('./comments_db.js');



router.get('/', function(req, res){
    res.render('comments', {layout : 'comments_head'});
});

module.exports = router;
