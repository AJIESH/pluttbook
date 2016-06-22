var Chat = require('../models/Chat.js');

module.exports.saveChat = function(senderId, receiverId, message, callback){
    var chat = Chat.schema({
        senderId: senderId,
        receiverId: receiverId,
        message: message,
        dateTime: new Date()
    });
    chat.save(function(err){
        err === null ? callback(false) : callback(true);
    });
};

module.exports.getMessages = function(currentUserId, friendId, count, offset, callback){
    Chat.schema.find({
        $or: [
            {$and: [{senderId: currentUserId}, {receiverId: friendId}]},
            {$and: [{senderId: friendId}, {receiverId: currentUserId}]}
        ]
    }).exec(function(err, obj){
        (err === null) ? callback(obj, false) : callback(null, true);
    });
};