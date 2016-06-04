var Friends = require('../models/Friends.js');
var UserInfo = require('./UserInfo.js');
var async = require('async');

module.exports.createNewUserFriendsSchema = function(userId, callback){
    var friends = Friends.schema({
        userId: userId,
        friends: [{
            userId: userId
        }]
    });
    friends.save(function(err){
        err === null ? callback(false) : callback(true);
    });
};

module.exports.getFriends = function(userId, callback){
    Friends.schema.find({userId: userId}).exec(function(err, obj){
        (err === null) ? callback(obj, false) : callback(null, true);
    });
};

module.exports.isUserFriend = function(userId, friendId, callback){
    Friends.schema.find({$and: [
        {userId: userId},
        {'friends.userId': friendId}
    ]}).exec(function(err, obj){
        (err === null) ? callback(obj, false) : callback(obj, true);
    });
};

module.exports.saveFriend = function(userId, friendId, callback){
    Friends.schema.findOneAndUpdate(
        {'userId': userId},
        {$push: {'friends': {userId: friendId}}},
        {new: true, runValidators: true}
    ).exec(function(err, obj){
            (err === null) ? callback(obj, false) : callback(null, true);
    });
};

module.exports.removeFriend = function(userId, friendId, callback){
    Friends.schema.findOneAndUpdate(
        {'userId': userId},
        {$pull: {'friends': {userId: friendId}}},
        {new: true, runValidators: true}
    ).exec(function(err, obj){
            (err === null) ? callback(obj, false) : callback(null, true);
    });
};

module.exports.getFriendsUserInfoAsync = function(friends, callback){
    var response = [];
    async.forEachOf(friends, function(friend, key, callback){

        async.parallel([
                function(callback) {
                    UserInfo.getUserInfoAsync(friend, callback);
                }
            ],
            function(err, results) {
                response.push(results[0]);
                callback();
            });
    },
    function(err){
        callback(response, err);
    });
};