module.exports = function(mdPanelRef, editPicturesFactory, Upload){
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

    function save(){
        Upload.base64DataUrl([vm.profilePhoto, vm.coverPhoto]).then(function(data){
            var body = {
                profilePhotoName: vm.profilePhoto.name,
                profilePhoto: data[0],
                coverPhotoName: vm.coverPhoto.name,
                coverPhoto: data[1]
            };
            editPicturesFactory.savePictures(body)
                .success(function(data){
                    vm.profilePhoto = data.profilePhoto;
                    vm.coverPhoto = data.coverPhoto;
                })
                .error(function(data){
                    console.log('Error retrieving pictures');
                });
        });
    }
};