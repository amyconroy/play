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
  var commentId = req.commentId; // need to figure out what this will do
  commentsDB.deleteComment(commentId, (rows) =>{
    if(rows){ // add in flash for successful delete
      commentsDB.getTenRecentComments(error => {
        if(error){
          console.log("can't display 10 most recent comments");
        }
        else{
          console.log("10 most recent comments displayed");
        }
      });
    }
    else{
      console.log("comment has not been sucessfully deleted");
    }
  });
});

router.post('/all_comments', function(req, rest){
  commentsDB.getAllComments(err, rows => {
    if(rows){
      console.log("got all comments");
      // res.render() here
    }
    else{
      console.log("did not get all comments");
      // diff ress render?
    }
  });
});

module.exports = router;
