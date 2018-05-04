var mysql = require('mysql');
var db = require('./db_connection');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback){
    var query = 'CALL school_getall()';

    connection.query(query, function(err, result){
        callback(err, result);
    });
};

exports.insert = function(params, callback){
    var query = 'INSERT INTO school (school_name) VALUES (?)';

    var queryData = [params.school_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};


exports.getinfo = function(school_id, callback) {
    var query = 'CALL school_getinfo(?)';
    var queryData = [school_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.update = function(params, callback){
    var query = 'UPDATE school SET school_name = ? WHERE school_id = ?';

    var queryData = [params.school_name, params.school_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
};

exports.Delete = function(school_id, callback) {
    var query = 'CALL deleteSchoolAndRelations(?)';

    connection.query(query, school_id, function(err, result){
        callback(err, school_id);
    });
};