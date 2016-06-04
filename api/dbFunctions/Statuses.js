var Statuses = require('../models/Statuses.js');
var UserInfo = require('./UserInfo.js');
var async = require('async');

module.exports.saveStatus = function(id, status, date, callback){
    var status = Statuses.schema({
        userId: id,
        status: status,
        dateTime: date
    });
    status.save(function(err){
        err === null ? callback(false) : callback(true);
    });
};

module.exports.getStatuses = function(id, callback){
    Statuses.schema.find({userId: id}).exec(function(err, obj){
        (err === null) ? callback(obj, false) : callback(null, true);
    });
};

module.exports.getStatusesAsync = function(id, callback){
    Statuses.schema.find({userId: id.userId}).exec(function(err, obj){
        if (err === null){
            return callback(null, obj);
        }
        else{
            return callback(true);
        }
    });
};

module.exports.saveLike = function(statusId, userId, callback){
    Statuses.schema.findByIdAndUpdate(
        statusId,
        {$push: {'likes': {userId: userId}}},
        {new: true, runValidators: true}
    ).exec(function(err, obj){
        (err === null) ? callback(obj, false) : callback(null, true);
    });
};

module.exports.removeLike = function(statusId, userId, callback){
    Statuses.schema.findByIdAndUpdate(
        statusId,
        {$pull: {'likes': {userId: userId}}},
        {new: true, runValidators: true}
    ).exec(function(err, obj){
            (err === null) ? callback(obj, false) : callback(null, true);
    });
};

module.exports.hasUserLiked = function(statusId, userId, callback){
    Statuses.schema.find({$and: [
        {_id: statusId},
        {'likes.userId': userId}
    ]}).exec(function(err, obj){
        (err === null) ? callback(obj, false) : callback(obj, true);
    });
};

module.exports.saveComment = function(statusId, comment, date, userId, callback){
    Statuses.schema.findByIdAndUpdate(
        statusId,
        {$push: {'comments':
            {userId: userId,
             text: comment,
             dateTime: date}}},
        {new: true, runValidators: true}
    ).exec(function(err, obj){
        (err === null) ? callback(obj, false) : callback(null, true);
    });
};

module.exports.getStatusesUserInfo = function(statuses, callback){
    var response = [];
    async.forEachOf(statuses, function(status, key, callback){
        async.parallel([
                function(callback) {
                    UserInfo.getUserInfoAsync(status, callback);
                },
                function(callback){
                    async.map(status.likes, UserInfo.getUserInfoAsync, function(err, result){
                        callback(null, result);
                    });
                },
                function(callback){
                    async.map(status.comments, UserInfo.getUserInfoAsync, function(err, result){
                        callback(null, result);
                    });
                }
            ],
            function(err, results){
                var newObject = {
                    userId: statuses[key].userId,
                    statusId: statuses[key]._id,
                    status: statuses[key].status,
                    dateTime: statuses[key].dateTime,
                    likes: [],
                    comments: [],
                    userInfo: null
                };

                async.parallel([
                    function(callback){
                        newObject.userInfo = results[0];
                    },
                    function(callback){
                        var statusesLikesUsersInfo = results[1];
                        for(var i=0; i<status.likes.length; i++){
                            newObject.likes.push({
                                userId: statuses[key].likes[i].userId,
                                userInfo: statusesLikesUsersInfo[i]
                            });
                        }
                    },
                    function(callback){
                        var statusesCommentsUsersInfo = results[2];
                        for(var i=0; i<status.comments.length; i++){
                            newObject.comments.push({
                                userId: statuses[key].comments[i].userId,
                                text: statuses[key].comments[i].text,
                                dateTime: statuses[key].comments[i].dateTime,
                                userInfo: statusesCommentsUsersInfo[i],
                                hideComment: status.comments.length - 3 > i
                            });
                        }
                    }
                ]);
                response.push(newObject);
                callback();
            });
    }, function (err){
        callback(response, err);
    });
};