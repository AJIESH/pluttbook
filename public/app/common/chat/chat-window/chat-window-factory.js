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

    function getMessages(userId){
        return $http.get('api/chat/' + userId);
    }
};