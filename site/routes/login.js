var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('login', {layout : 'login_head'});
});

//the post request for url validation would go here
router.post('/register', function(req, res){
    res.send('gotha reg request');
});

router.post('/auth', function(req, res){
    res.send('gotha auth request');
});

module.exports = router;
