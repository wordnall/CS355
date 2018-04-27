var express = require('express');
var router = express.Router();
var resume_dal = require('../dal/resume_dal');
var account_dal = require('../dal/account_dal');

router.get('/all', function(req, res, next){
    resume_dal.getResumeAccount(function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('resume/resume_view_all', {resumes: result[0]});
        }
    });
});

router.get('/add/selectuser', function(req, res){
    account_dal.getAll(function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('resume/resume_select_user', {accounts: result[0]});
        }
    });
});

router.get('/add', function(req, res){
    resume_dal.getinfo(req.query.account_id, function(err, result){
        if(err){
            res.send(err);
        }else{
            res.render('resume/resume_add', {account_id: req.query.account_id, skills: result[0], schools: result[1], companies: result[2]});
        }
    });
});

router.get('/insert', function(req, res){
    resume_dal.insert(req.query, function(err, result){
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.redirect(302, '/resume/all');
        }
    });
});

module.exports = router;