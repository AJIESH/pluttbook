var async = require('async');

module.exports.getAuthTokenFromHeader = function(request, result){
    if(request.get('Authorization').indexOf('Bearer') === 0){
        return request.get('Authorization').substring(7, request.get('Authorization').length);
    }
    else{
        result.sendStatus(401);
    }
};

module.exports.getUnixTime = function(){
    var date = new Date();
    return Date.parse(date)/1000;
};

module.exports.quickSort = function(arr, customSort){
    //if array is empty
    if(!customSort) {
        customSort = function(a, b) {
            return a < b;
        };
    }
    if (arr.length === 0) {
        return [];
    }
    var left = [];
    var right = [];
    var pivot = arr[0];
    //go through each element in array
    for (var i = 1; i < arr.length; i++) {
        if (customSort(arr[i], pivot)) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return this.quickSort(left, customSort).concat(pivot, this.quickSort(right, customSort));
};

module.exports.sortByDate = function(statuses){
    for(var i=0; i<statuses.length; i++){
        statuses[i].comments = this.quickSort(statuses[i].comments, commentSort);
    }
    return this.quickSort(statuses, statusSort);
};

function statusSort(a, b){
    return a.dateTime > b.dateTime;
}

function commentSort(a, b){
    return a.dateTime < b.dateTime;
}

module.exports.concatArrays = function(arrays){
    var concated = [];
    for(var i=0; i<arrays.length; i++){
        concated = concated.concat(arrays[i]);
    }
    return concated;
};

module.exports.isUserActive = function(users, callback){
    var activeUsers = [];
    async.each(users, function(user, callback){
            var cutOffDate = new Date();
            //55 minutes because token experation date is ahead by 60 min// Invalid if no activity in last 5 min
            cutOffDate = addMinutes(cutOffDate, 55);
            if(user.expires > cutOffDate){
                activeUsers.push(user);
            }
            callback();
        },
        function(err){
            callback(activeUsers, err);
        });
};

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

module.exports.removeUserFromArray = function(array, userId){
    for(var i=0; i<array.length; i++){
        if(array[i].userId === userId){
            array.splice(i, 1);
        }
    }
    return array;
};

module.exports.pageArray = function(array, count, offset){
    array.splice(0, offset);
    if(array.length > count){
        array.splice(count, messages.length);
    }
    return array;
};