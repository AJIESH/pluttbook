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