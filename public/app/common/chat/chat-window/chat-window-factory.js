module.exports = function($http){
    return {
        sendMessage: sendMessage,
        getMessages: getMessages,
        setMessagesToRead: setMessagesToRead
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

    function setMessagesToRead(userId){
        var body = {
            userId: userId
        };
        return $http.post('api/notifications', body);
    }
};