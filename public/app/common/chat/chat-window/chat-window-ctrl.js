module.exports = function(mdPanelRef, userInfo){
    vm = this;
    //---Functions---
    vm.close = close;
    //---Variables---

    function close(){
        mdPanelRef.close();
    }


};