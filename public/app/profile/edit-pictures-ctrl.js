module.exports = function(mdPanelRef){
    vm = this;
    //---Functions---
    vm.closePanel = closePanel;
    //---Variables---
    vm.mdPanelRef = mdPanelRef;

    function closePanel(){
        vm.mdPanelRef && vm.mdPanelRef.close().then(function(){
            angular.element(document.querySelector('.demo-dialog-open-button')).focus();
        });
    }
};