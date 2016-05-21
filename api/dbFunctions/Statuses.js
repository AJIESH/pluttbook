var Statuses = require('../models/Statuses.js');

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
    Statuses.schema.find({userId: id}).select('-userId').populate('-userId').exec(function(err, obj){
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