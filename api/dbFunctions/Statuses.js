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
    var statuses = Statuses.schema.find({userId: id}, function(err, obj){
        (err === null) ? callback(obj, false) : callback(null, true);
    })
};
