var express = require('express');
var router = express.Router();
var company_dal = require('../dal/company_dal');
var address_dal = require('../dal/address_dal');

/* GET users listing. */
router.get('/all', function(req,res,next) {
    company_dal.getAll(function(err, result) {
        if(err){
            console.log(err);
            res.send(err);
        }else {
            res.render('company/company_view_all1', {company_id: req.query.company_id, was_successful: req.query.was_successful, companies: result[0]});
        }
    });
});

router.get('/add', function(req, res) {
    address_dal.getAll(function(err, result) {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            res.render('company/company_add', {address_result:result[0]});
        }
    });
});

router.get('/insert', function(req, res) {
    company_dal.insert(req.query, function(err, company_id) {
        if(err) {
            console.log(err);
            res.send(err);
        } else {
            res.redirect(302,'/company/edit?company_id=' + company_id);
        }
    });
});

router.get('/edit', function(req, res) {
    company_dal.getinfo(req.query.company_id, function(err, result) {
        if(err) {
            console.log(err);
            res.send(err);
        }else {
            res.render('company/companyUpdate', {company: result[0][0], address_result: result[1], was_successful: true});
        }
    });
});

router.get('/update', function(req, res) {
     company_dal.update(req.query, function(err, result) {
        if(err) {
            console.log(err);
            res.send(err);
        }else {
            res.redirect(302, '/company/all');
        }
    });
});

router.get('/delete', function(req, res) {
    company_dal.Delete(req.query.company_id, function(err, company_id) {
        if(err){
            res.redirect(302, '/company/all?company_id=' + company_id + '&was_successful=false');
        }else{
            res.redirect(302, '/company/all?company_id=' + company_id + '&was_successful=true');
        }
    });
});

module.exports = router;
