var OAuthUsers = require('../../dbFunctions/OAuthUsers.js');
var UserInfo = require('../../dbFunctions/UserInfo.js');
var Friends = require('../../dbFunctions/Friends.js');
var bcrypt = require('bcrypt-nodejs');
var email, password, firstName, lastName, userId;

module.exports.controller = function(app){
  app.post('/api/createAccount', function(request, result){
      firstName = req.body.firstName;
      lastName = req.body.lastName;
      email = req.body.email;
      password = req.body.password;

      OAuthUsers.emailUnique(email, hashPassword);

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

      function saveUserInfo(userId, err){
          this.userId = userId;
          (!err) ? UserInfo.saveUserInfo(userId, email, firstName, lastName, createUsersFriendsSchema) : result.sendStatus(500);
      }

      function createUsersFriendsSchema(err){
          (!err) ? Friends.createNewUserFriendsSchema(this.userId, finish) : result.sendStatus(500);
      }

      function finish(err){
          (!err) ? result.sendStatus(200) : result.sendStatus(500);
      }
  });
};
