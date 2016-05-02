var Statuses = require('../models/Statuses.js');

module.exports.saveStatus = function(email, status, date, callback){
    var status = Statuses.schema({
        userId: email,
        status: status,
        dateTime: date
    });
    status.save(function(err){
        err === null ? callback(false) : callback(true);
    });
};
