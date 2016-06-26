module.exports = function($http){

    var currentIndex = 0;
    var chatWindowData = {
        userId: '',
        numberWindowsOpen: 0
    };

    return {
        getAvailableFriends: getAvailableFriends,
        getSetIndex: getSetIndex,
        getNotifications: getNotifications,
        setMessagesToRead: setMessagesToRead,
        getChatWindowData: getChatWindowData,
        setChatWindowData: setChatWindowData
    };

    function getAvailableFriends(){
        var route = 'api/availableFriends';
        return $http.get(route);
    }

    function getSetIndex(index){
        if(index !== undefined){
            currentIndex = index;
        }
        else{
            return currentIndex;
        }
    }

    function getNotifications(){
        return $http.get('api/notifications');
    }

    function setMessagesToRead(userId){
        var body = {
            userId: userId,
            type: 'message'
        };
        return $http.post('api/notifications', body);
    }

    function getChatWindowData(){
        return chatWindowData;
    }

    function setChatWindowData(numberOfWindows, userId){
        chatWindowData.numberWindowsOpen = numberOfWindows;
        chatWindowData.userId = userId;
    }
};