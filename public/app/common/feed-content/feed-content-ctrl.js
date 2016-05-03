module.exports = function(feedFactory) {
    var vm = this;
    //--Variables---

    feedFactory.getStatuses();
    getStatuses();

    function getStatuses(){
        feedFactory.getStatus().then(function(data){
            vm.news = data.data;
            feedFactory.setStatusesToDefered();
            getStatuses();
        });
    }
};