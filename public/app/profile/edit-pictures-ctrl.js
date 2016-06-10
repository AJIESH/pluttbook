module.exports = function(mdPanelRef, Upload){
    vm = this;
    //---Functions---
    vm.cancel = cancel;
    vm.save = save;
    //---Variables---
    vm.mdPanelRef = mdPanelRef;
    vm.profilePhoto = null;
    vm.coverPhoto = null;

    function cancel(){
        vm.mdPanelRef.close();
    }

    function save(file){

    }
};