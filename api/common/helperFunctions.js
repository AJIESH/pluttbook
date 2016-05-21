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

module.exports.concatArrays = function(arrays){
    var concated = [];
    for(var i=0; i<arrays.length; i++){
        concated = concated.concat(arrays[i]);
    }
    return concated;
}