var express = require('express');
var router = express.Router();
var account_dal = require('../dal/account_dal');

router.get('/all', function(req, res, next) {
    account_dal.getAll(function(err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else {
            res.render('account/account_view_all', {account: result});
        }
    });
});

router.get('/add', function(req, res){
    res.render('account/account_add');
});

router.get('/insert', function(req, res) {
    account_dal.insert(req.query, function(err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else {
            res.redirect(302,'/account/all');
        }
    });
});

module.exports = router;