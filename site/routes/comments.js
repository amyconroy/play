"use strict";
var express = require('express');
var router = express.Router();
var commentsDB = require('./comments_db.js');

router.get('/', function(req, res){
  console.log(req.session.user);
  console.log(req.sessionID);

  var commentsArray = [];

  getAllComments(function(commentsArray) {
    if (commentsArray) {
      res.render('comments', {
        layout : 'comments_head',
        userLoggedIn: req.session.user,
        comments: commentsArray //passes array of JSON objects made of comment data
      });
    }
  });
});

var getAllComments = function getAllComments(callback){
  var anotherArray = [];

  commentsDB.getTenRecentComments((error, rows) => {
    if (error) {
      console.log(error);
    }
    if(rows){
        var date = new Date(parseInt(rows.timePosted)).toLocaleString();
        var currentCommentInfo = { //change this to be the username and comment content
          comment: rows.content,
          username: rows.userName,
          postTime: date
        };
        anotherArray.push(currentCommentInfo);
    } else {
      console.log("Error occured, couldnt retrieve comments");
    }
  });
  callback(anotherArray);
}

/// CREATE NEW COMMENT ////
router.post('/submit_comment', function(req, res){
  if (req.session.user) {
    var newComment = {
      userId: req.session.user["userid"],
      timePosted: Date.now(),
      content: req.body.content
    }
    commentsDB.newComment(newComment);
    res.redirect("/index");
  } else {
    console.log("USER NOT LOGGED IN"); //REQUIRE LOGIN TO SUBMIT A COMMENT

    getAllComments(function(commentsArray) {
      if (commentsArray) {
        res.render('comments', {
          layout : 'comments_head',
          error: true,
          errormessage: "You must be logged in to comment",
          userLoggedIn: req.session.user,
          comments: commentsArray //passes array of JSON objects made of comment data
        });
      }
    });

  }


});

/// DELETE COMMENT ////
router.post('/delete_comment', function(req, res){
  var commentId = req.commentId; // HOW TO DO COMMENT ID
  commentsDB.deleteComment(commentId, (rows) =>{
    if(rows){ // add in flash for successful delete
      commentsDB.getTenRecentComments(error => {
        if(error){
          console.log(error);
        }
      });
    }
    else{
      console.log("Comment has not been sucessfully deleted.");
    }
  });
});

router.post('/all_comments', function(req, res){
  commentsDB.getAllComments(err, rows => {
    if(rows){
      res.render('comments', {
        results: rows,
        user: 1
      });
    } else{ //no comments available
      res.render('comments', {
        results: null,
        user: 1
      });
      console.log("Did not get all comments.");
      // diff ress render?
    }
  });
});

module.exports = router;
