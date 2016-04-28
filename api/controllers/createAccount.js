var OAuthUsers = require('../dbFunctions/OAuthUsers.js');
var bcrypt = require('bcrypt-nodejs');
var request, result, email, password;

module.exports.controller = function(app, db){
  app.post('/api/createAccount', function(req, res){
      request = req;
      result = res;
      email = req.body.email;
      password = req.body.password;
      OAuthUsers.emailUnique(email, hashPassword);
  });
};

function hashPassword(err){
    if(!err){
        bcrypt.hash(password, null, null, function(err, hash) {
            err === null ? OAuthUsers.saveUser(email, hash, finish) : result.sendStatus(500);
        });
    }
    else{
        result.sendStatus(500);
    }
}

function finish(err){
    (!err) ? result.sendStatus(200) : result.sendStatus(500);
}
