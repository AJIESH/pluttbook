module.exports = function($http){
    return {
        sendMessage: sendMessage
    };

    function sendMessage(text){
        var body = {
            text: text
        };
        return $http.post('api/chat', body);
    }


};