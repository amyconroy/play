var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  if (req.session.user) {

    if (req.session.userBasket['products'].length == 0) {

      res.render('payment', {
        layout : 'index_head',
        error: true,
        errormessage: "Your basket is empty, please add products to basket"
      });

    } else {
      res.render('payment', {
        layout : 'index_head',
        userLoggedIn: req.session.user
      });
    }

  } else {
    console.log("NOT LOGGED IN");
    res.render('payment', {
      layout : 'index_head',
      error: true,
      errormessage: "You must be logged in to access payment"
    });
  }
});

module.exports = router;
