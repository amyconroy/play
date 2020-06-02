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
    commentsDB.deleteComment(commentId, (rows))
    if(rows) =>{ // add in flash for successful delete
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

router.post('/all_comments', function(req, rest){
  commentsDB.getAllComments(err, rows) => {
    if(rows){
      // res.render() here
    }
    else{
      // diff ress render? null results for what comments to s
    }
  }
})

module.exports = router;
