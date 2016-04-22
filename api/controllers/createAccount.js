var OAuthUsersModel = require('../models/OAuthUsers.js');
var bcrypt = require('bcrypt-nodejs');

module.exports.controller = function(app, db){
  app.post('/api/createAccount', function(req, res){
      emailUnique(req, res, hashPassword);
  });
};

function emailUnique(req, res, callback){
    OAuthUsersModel.schema.findOne({ email: req.body.email }, function(err, obj){
        obj == null ? callback(req, res, saveUser) : res.send('User already exists.');
    });
}

function hashPassword(req, res, callback){
    bcrypt.hash(req.body.password, null, null, function(err, hash) {
        req.body.password = hash;
        err === null ? callback(req, res) : res.sendStatus(500);
    });
}

function saveUser(req, res){
    var user = new OAuthUsersModel.schema({
        email: req.body.email,
        password: req.body.password
    });
    user.save(function(err){
        !err ? res.sendStatus(200) : res.sendStatus(500);
    });
}
