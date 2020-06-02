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
});

/// DELETE COMMENT ////
router.post('/delete_comment', function(req, res){
  var commentId = req.commentId, (rows) =>{
    commentsDB.deleteComment(commentId, (err, rows))
    if(rows) =>{
      commentsDB.getTenRecentComments(error) => {
        if(error){
          console.log("can't display 10 most recent comments");
        }
        else{
          console.log("10 most recent comments displayed!");
        }
      }
    }
    else{
      console.log("comment has not been sucessfully deleted");
    }
  }
});

module.exports = router;
