module.exports = function(createStatusFactory, feedFactory) {
    var vm = this;
    //---Functions---
    vm.postStatus = postStatus;
    //--Variables---


    function postStatus(){
        createStatusFactory.postStatus(bundleStatus())
            .then(function(data){
                vm.status = '';
                feedFactory.getStatuses();
            })

    }

    function bundleStatus(){
        return {
            status: vm.status
        };
    }
};