var mysql = require('mysql');
var db = require('./db_connection');

var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'CALL skill_getall()';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {

    var query = 'INSERT INTO skill (skill_name, description) VALUES (?,?)';

    var queryData = [params.skill_name, params.description];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.getinfo = function(skill_id, callback) {
    var query = 'CALL skill_getinfo(?)';
    var queryData = [skill_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.update = function(params, callback) {
    var query = 'UPDATE skill SET skill_name = ?, description = ? WHERE skill_id = ?';
    var queryData = [params.skill_name, params.description, params.skill_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.Delete = function(skill_id, callback){
    var query = 'CALL deleteSkillAndRelations(?)';

    connection.query(query, skill_id, function(err, result) {
        callback(err, skill_id);
    });
};