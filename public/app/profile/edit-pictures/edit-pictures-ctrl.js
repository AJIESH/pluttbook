module.exports = function(mdPanelRef, editPicturesFactory, Upload, profileFactory){
    vm = this;
    //---Functions---
    vm.close = close;
    vm.save = save;
    //---Variables---
    vm.mdPanelRef = mdPanelRef;
    vm.profilePhoto = null;
    vm.coverPhoto = null;

    function close(){
        vm.mdPanelRef.close();
    }

    function save(){
        if(vm.profilePhoto && vm.coverPhoto){
            saveAllPhotos();
        }
        else if(vm.coverPhoto){
            saveCoverPhoto();
        }
        else if(vm.profilePhoto){
            saveProfilePhoto();
        }
    }


    function saveAllPhotos(){
        Upload.base64DataUrl([vm.profilePhoto, vm.coverPhoto]).then(function(data){
            var body = {
                profilePhotoName: vm.profilePhoto.name,
                profilePhoto: data[0].substring((data[0].indexOf('jpeg;base64')+12)),
                coverPhotoName: vm.coverPhoto.name,
                coverPhoto: data[1].substring((data[1].indexOf('jpeg;base64')+12))
            };
            editPicturesFactory.savePictures(body)
                .success(function(data){
                    vm.profilePhoto = null;
                    vm.coverPhoto = null;
                    updatePhotos();
                    close();
                })
                .error(function(data){
                    console.log('Error retrieving pictures');
                    close();
                });
        });
    }

    function saveProfilePhoto(){
        Upload.base64DataUrl([vm.profilePhoto]).then(function(data){
            var body = {
                profilePhotoName: vm.profilePhoto.name,
                profilePhoto: data[0].substring((data[0].indexOf('jpeg;base64')+12))
            };
            editPicturesFactory.savePictures(body)
                .success(function(data){
                    vm.profilePhoto = null;
                    vm.coverPhoto = null;
                    updatePhotos();
                    close();
                })
                .error(function(data){
                    console.log('Error retrieving pictures');
                    close();
                });
        });
    }

    function saveCoverPhoto(){
        Upload.base64DataUrl([vm.coverPhoto]).then(function(data){
            var body = {
                coverPhotoName: vm.coverPhoto.name,
                coverPhoto: data[0].substring((data[0].indexOf('jpeg;base64')+12))
            };
            editPicturesFactory.savePictures(body)
                .success(function(data){
                    vm.profilePhoto = null;
                    vm.coverPhoto = null;
                    updatePhotos();
                    close();
                })
                .error(function(data){
                    console.log('Error retrieving pictures');
                    close();
                });
        });
    }

    function updatePhotos() {
        profileFactory.getPictures()
            .success(function(data){
                profileFactory.setPictureData(data);
            })
            .error(function(data){
                console.log('Error retrieving pictures');
            });
    }
};