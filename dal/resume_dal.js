var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getResumeAccount = function(callback) {
    var query = 'CALL getResumeAccount()';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getinfo = function(account_id, callback){
    var query = 'CALL resume_getinfo(?)';
    var queryData = [account_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO resume (resume_name) VALUES (?)';

    var queryData = [params.resume_name];

    connection.query(query, queryData, function(err, result) {

        if (err || params.company_id === undefined) {
            callback(err, result);
        } else {
            var resume_id = result.insertId;
            var query = 'INSERT INTO resume_company (resume_id, company_id) VALUES ?';

            var resumeCompanyData = [];

            if (params.company_id.constructor === Array) {
                for (var i = 0; i < params.company_id.length; i++) {
                    resumeCompanyData.push([resume_id, company_id[i]]);
                }
            } else {
                resumeCompanyData.push([resume_id, company_id]);
            }
            connection.query(query, [resumeCompanyData], function(err, result) {

                if (err || params.school_id === undefined) {
                    callback(err, result);
                } else {
                    var resume_id = result.insertId;
                    var query = 'INSERT INTO resume_school (resume_id, school_id) VALUES ?';

                    var resumeSchoolData = [];

                    if (params.school_id.constructor === Array) {
                        for (var i = 0; i < params.school_id.length; i++) {
                            resumeSchoolData.push([resume_id, school_id[i]]);
                        }
                    } else {
                        resumeSchoolData.push([resume_id, school_id]);
                    }
                    connection.query(query, [resumeSchoolData], function(err, result) {

                        if (err || params.skill_id === undefined) {
                            callback(err, result);
                        } else {
                            var resume_id = result.insertId;
                            var query = 'INSERT INTO resume_skill (resume_id, skill_id) VALUES ?';

                            var resumeSkillData = [];

                            if (params.skill_id.constructor === Array) {
                                for (var i = 0; i < params.skill_id.length; i++) {
                                    resumeSkillDataData.push([resume_id, skill_id[i]]);
                                }
                            } else {
                                resumeSkillData.push([resume_id, skill_id]);
                            }
                            connection.query(query, [resumeSkillData], function (err, result) {
                                callback(err, result);
                            });
                        }
                    });
                }
            });
        }
    });
};
