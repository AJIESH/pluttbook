module.exports = function(feedFactory) {
    var vm = this;
    //---Functions---
    vm.formatStatusTime = formatStatusTime;
    //---Variables---
    feedFactory.getStatuses();
    getStatuses();

    function getStatuses(){
        feedFactory.getStatus().then(function(data){
            vm.news = data.data;
            getStatuses();
        });
    }

    function formatStatusTime(unix){
        return feedFactory.formatStatusTime(unix);
    }
};