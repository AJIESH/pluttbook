module.exports = function($http){
    return {
        sendMessage: sendMessage,
        getMessages: getMessages
    };

    function sendMessage(text, receiverId){
        var body = {
            text: text,
            receiverId: receiverId
        };
        return $http.post('api/chat', body);
    }

    function getMessages(userId, count, offset){
        return $http.get('api/chat/' + userId + '?' + 'count=' + count + '&offset=' + offset);
    }
};