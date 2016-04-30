var OAuthUsers = require('../dbFunctions/OAuthUsers.js');
var UserInfo = require('../dbFunctions/UserInfo.js');
var bcrypt = require('bcrypt-nodejs');
var request, result, email, password, firstName, lastName;

module.exports.controller = function(app){
  app.post('/api/createAccount', function(req, res){
      request = req;
      result = res;
      firstName = req.body.firstName;
      lastName = req.body.lastName;
      email = req.body.email;
      password = req.body.password;
      OAuthUsers.emailUnique(email, hashPassword);
  });
};

function hashPassword(err){
    if(!err){
        bcrypt.hash(password, null, null, function(err, hash) {
            err === null ? OAuthUsers.saveUser(email, hash, saveUserInfo) : result.sendStatus(500);
        });
    }
    else{
        result.sendStatus(500);
    }
}

function saveUserInfo(err){
    (!err) ? UserInfo.saveUserInfo(email, firstName, lastName, finish) : result.send(500);
}

function finish(err){
    (!err) ? result.sendStatus(200) : result.sendStatus(500);
}
