module.exports = function(mdPanelRef, editPicturesFactory, Upload, profileFactory, feedFactory, currentUserDataFactory){
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
        Upload.resize(vm.profilePhoto, 100, 100, .8).then(function(thumbnail){
            Upload.base64DataUrl([vm.profilePhoto, thumbnail, vm.coverPhoto]).then(function(data){
                var body = {
                    profilePhotoName: vm.profilePhoto.name,
                    profilePhoto: data[0].substring((data[0].indexOf('jpeg;base64')+12)),
                    profilePhotoThumbnail:  data[1].substring((data[1].indexOf('jpeg;base64')+12)),
                    coverPhotoName: vm.coverPhoto.name,
                    coverPhoto: data[2].substring((data[2].indexOf('jpeg;base64')+12))
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
        });
    }

    function saveProfilePhoto(){
        Upload.resize(vm.profilePhoto, 100, 100, .8).then(function(thumbnail){
            Upload.base64DataUrl([vm.profilePhoto, thumbnail]).then(function(data){
                var body = {
                    profilePhotoName: vm.profilePhoto.name,
                    profilePhoto: data[0].substring((data[0].indexOf('jpeg;base64')+12)),
                    profilePhotoThumbnail:  data[1].substring((data[1].indexOf('jpeg;base64')+12))
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

        feedFactory.setProfilePicturesToEmpty();
        feedFactory.getStatuses(false);
        currentUserDataFactory.getUserInfoObject().then(function(data){
            currentUserDataFactory.getProfilePicture(data.userId);
        });
    }
};