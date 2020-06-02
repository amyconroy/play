var express = require('express');
var router = express.Router();
var commentsDB = require('./comments_db.js');

router.get('/', function(req, res){
    res.render('comments', {layout : 'comments_head'});
});


/// CREATE NEW COMMENT ////

router.post('/new_comment', function(req, res){
  var newComment = {
    userId: req.body.userId,
    timePosted: now(),
    content: req.body.content
  }
  commentsDB.newComment(newComment);
})

module.exports = router;
