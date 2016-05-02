module.exports = function(feedFactory) {
    var vm = this;
    //--Variables---

    feedFactory.getStatuses();
    getStat();

    function getStat(){
        feedFactory.getStatus().then(function(data){
            vm.news = data.data;
            feedFactory.setStatusesToDefered();
            getStat();
        });
    }
};