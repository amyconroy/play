var express = require('express');
var router = express.Router();
var commentsDB = require('./comments_db.js');

router.get('/', function(req, res){
  console.log(req.session.user);
  console.log(req.sessionID);

  var tenMostRecent
// so for username (req.username - need in html?)
    res.render('comments', {
      layout : 'comments_head',
      comments: [{comment:"bruh", username:"meee"},
                 {comment:"bruh", username:"meee"},
                 {comment:"bruh", username:"meee"},
                 {comment:"bruh", username:"meee"}] //amy is a cock
      //names:testArrayComments
    });
});

/// CREATE NEW COMMENT ////
router.post('/submit_comment', function(req, res){ //comments/submit_comment
  var newComment = {
    userId: 130,
    timePosted: Date.now(),
    content: req.body.content
  }
  commentsDB.newComment(newComment);
//  req.flash("inserting comment");
});

/// DELETE COMMENT ////
router.post('/delete_comment', function(req, res){
  var commentId = req.commentId; // HOW TO DO COMMENT ID
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

router.post('/all_comments', function(req, res){
  commentsDB.getAllComments(err, rows => {
    if(rows){
      console.log("got all comments");
      res.render('comments', {
        results: rows,
        user: 1
      });
    } else{ //no comments available
      res.render('comments', {
        results: null,
        user: 1
      });
      console.log("did not get all comments");
      // diff ress render?
    }
  });
});

module.exports = router;
