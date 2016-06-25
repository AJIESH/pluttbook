var Chat = require('../models/Chat.js');
var notifications = require('./Notifications.js');

module.exports.saveChat = function(senderId, receiverId, message, callback){
    var chat = Chat.schema({
        senderId: senderId,
        receiverId: receiverId,
        message: message,
        dateTime: new Date()
    });
    chat.save(function(err){
        if(err === null){
            notifications.addNotification(receiverId, senderId, 'message', callback);
        }
        else{
            callback(true);
        }
    });
};

module.exports.getMessages = function(currentUserId, friendId, callback){
    Chat.schema.find({
        $or: [
            {$and: [{senderId: currentUserId}, {receiverId: friendId}]},
            {$and: [{senderId: friendId}, {receiverId: currentUserId}]}
        ]
        })
        .sort({'dateTime': -1})
        .limit(100)
    .exec(function(err, obj){
            (err === null) ? callback(obj, false) : callback(null, true);
    });
};