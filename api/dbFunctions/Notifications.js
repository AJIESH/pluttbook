var Notifications = require('../models/Notifications.js');

module.exports.addNotification = function(userId, senderId, type, callback){
    Notifications.schema.findOneAndUpdate(
    {'userId': userId},
    {$push: {'notifications':
        {
            fromUserId: senderId,
            type: type
        }
    }}, {upsert: true, new: true, runValidators: true})
    .exec(function(err, obj){
       err === null ? callback(obj, false) : callback(null, true);
    });
};

module.exports.removeNotification = function(userId, senderId, type, callback){
    Notifications.schema.findOneAndUpdate(
        {userId: userId},
        {$pull: {'notifications':
            {
                fromUserId: senderId,
                type: 'message'
            }
        }}, {upsert: true, new: true, runValidators: true})
    .exec(function(err, obj){
        err === null ? callback(obj, false) : callback(null, true);
    });
};

module.exports.getNotifications = function(userId, callback){
    Notifications.schema.find({userId: userId}, 'notifications')
    .exec(function(err, obj){
        (err === null) ? callback(obj, false) : callback(null, true);
    });
};