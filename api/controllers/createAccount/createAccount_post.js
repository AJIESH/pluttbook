var OAuthUsers = require('../../dbFunctions/OAuthUsers.js');
var UserInfo = require('../../dbFunctions/UserInfo.js');
var Friends = require('../../dbFunctions/Friends.js');
var Photos = require('../../dbFunctions/Photos.js');
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
var email, password, firstName, lastName, userId;

module.exports.controller = function(app){
  app.post('/api/createAccount', function(request, result){
      firstName = request.body.firstName;
      lastName = request.body.lastName;
      email = request.body.email;
      password = request.body.password;

      if(firstName === undefined || lastName === undefined || email === undefined || password === undefined){
          result.sendStatus(400);
      }

      OAuthUsers.emailUnique(email, hashPassword);

      function hashPassword(err){
          if(!err){
              bcrypt.hash(password, null, null, function(err, hash) {
                  err === null ? OAuthUsers.saveUser(email, hash, saveUserInfo) : result.sendStatus(500);
              });
          }
          else{
              result.sendStatus(400);
          }
      }

      function saveUserInfo(userId, err){
          this.userId = userId;
          (!err) ? UserInfo.saveUserInfo(userId, email, firstName, lastName, createUsersFriendsSchema) : result.sendStatus(500);
      }

      function createUsersFriendsSchema(err){
          (!err) ? Friends.createNewUserFriendsSchema(this.userId, creatUsersPhotots) : result.sendStatus(500);
      }

      function creatUsersPhotots(err){
          if(!err){
              var profileThumbnail = fs.readFileSync('./api/images/default-profile-thumbnail.txt');
              var profilePhoto = fs.readFileSync('./api/images/default-profile-photo.txt');
              var coverPhoto = fs.readFileSync('./api/images/default-cover-photo.txt');
              Photos.savePhotos(this.userId, 'default-cover-photo.jpg', profilePhoto, profileThumbnail, 'default-cover-photo.jpg', coverPhoto, finish);
          }
          else{
              result.sendStatus(500);
          }
      }

      function finish(obj, err){
          (!err) ? result.sendStatus(200) : result.sendStatus(500);
      }
  });
};
