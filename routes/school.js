var express = require('express');
var router = express.Router();
var school_dal = require('../dal/school_dal');

router.get('/all', function(req, res, next) {
    school_dal.getAll(function(err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.render('school/school_view_all', {schools: result[0]});
        }
    });
});

router.get('/add', function(req, res) {
    res.render('school/school_add');
});

router.get('/insert', function(req, res) {
    school_dal.insert(req.query, function(err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.redirect(302,'/school/all');
        }
    });
});

router.get('/edit', function(req, res) {
    school_dal.getinfo(req.query.school_id, function(err, result){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.render('school/schoolUpdate', {school: result[0][0]});
        }
    });
});

router.get('/update', function(req, res) {
    school_dal.update(req.query, function(err, result){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.redirect(302, '/school/all');
        }
    });
});

module.exports = router;