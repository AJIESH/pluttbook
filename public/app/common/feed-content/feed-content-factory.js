module.exports = function($q, $http, $routeParams, $location, $window){
    var statuses = {
        statuses: null,
        commentBoxArray: []
    };

    var profilePhotos = {};
    var newProfilePhotos = $q.defer();
    var count = 25;
    var offset = 0;
    var pagingAllowed = true;

    return {
        getStatuses: getStatuses,
        postLike: postLike,
        postComment: postComment,
        formatStatusTime: formatStatusTime,
        statuses: statuses,
        goToProfile: goToProfile,
        getNewProfilePictures: getNewProfilePictures,
        deferNewProfilePictures: deferNewProfilePictures,
        setProfilePicturesToEmpty: setProfilePicturesToEmpty
    };

    function getStatuses(paged) {
        var route = 'api/status';
        if($routeParams.hasOwnProperty('userid')){
            route = route + '/' + $routeParams.userid;
        }
        if(paged){
            offset += count;
        }
        else{
            offset = 0;
            pagingAllowed = true;
        }
        route = route + '?count=' + count + '&offset=' + offset;

        if(pagingAllowed){
            $http.get(route)
                .success(function(data){
                    if(paged){
                        statuses.statuses = statuses.statuses.concat(data);
                        if(data.length !== count){
                            pagingAllowed = false;
                        }
                    }
                    else {
                        offset = 0;
                        $window.scrollTo(0,0);
                        statuses.statuses = data;
                    }
                    getProfilePictures();
                    createBlankCommentBoxArray();
                })
                .error(function(data){
                    console.log('Here');
                });
        }
    }

    function postLike(statusId){
        return $http.post('api/like', statusId);
    }

    function postComment(comment){
        return $http.post('api/comment', comment);
    }

    function formatStatusTime(unix){
        var currentTime = new Date();
        currentTime = Date.parse(currentTime)/1000;
        var difference = currentTime - unix;
        //Converts to minutes if less than 60
        if(Math.floor(difference / 60) < 60){
            return Math.floor(difference / 60).toString() + ' mins ago';
        }
        else if(Math.floor(difference / 3600) < 24){
            return Math.floor(difference / 3600).toString() + ' hrs ago';
        }
        else if(Math.floor(difference / 86400)< 7){
            return Math.floor(difference / 86400) + ' days ago';
        }
        else{
            var date = new Date(unix * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = date.getFullYear();
            var month = months[date.getMonth()];
            var day = date.getDate();
            return month + ' ' + day + ' ' + year;
        }
    }

    function createBlankCommentBoxArray() {
        for (var i = 0; i < statuses.statuses.length; i++) {
            statuses.commentBoxArray.push('');
        }
    }

    function goToProfile(userId){
        $location.path('/profile/userid/' + userId);
    }

    function getNewProfilePictures(){
        return newProfilePhotos.promise;
    }

    function deferNewProfilePictures(){
        newProfilePhotos = $q.defer();
    }

    function getProfilePictures(){
        var userIds = getUniqueUserIds();
        removeUnNeededProfilePictures(userIds);
        if(Object.keys(userIds).length === Object.keys(profilePhotos).length){
            newProfilePhotos.resolve(profilePhotos);
        }
        else{
            angular.forEach(userIds, function(userId){
                if(profilePhotos[userId] === undefined){
                    $http.get('api/profile_photo/' + userId)
                        .success(function(data){
                            profilePhotos[userId] =
                            {
                                profilePhoto: data.profilePhotoThumbnail,
                                userId: userId
                            };
                            if(Object.keys(userIds).length === Object.keys(profilePhotos).length){
                                newProfilePhotos.resolve(profilePhotos);
                            }
                        })
                        .error(function(data){
                            profilePhotos[userId] =
                            {
                                profilePhoto: null,
                                userId: userId
                            };
                            if(Object.keys(userIds).length === Object.keys(profilePhotos).length){
                                newProfilePhotos.resolve(profilePhotos);
                            }
                            console.log('Error getting timeline profile pictures');
                        });
                }
            });
        }
    }

    function removeUnNeededProfilePictures(userIds){
        angular.forEach(profilePhotos, function(profilePhoto){
            var needed = false;
            angular.forEach(userIds, function(userId){
               if(userId === profilePhoto.userId){
                   needed = true;
               }
            });
            if(!needed){
                delete profilePhotos[profilePhoto.userId];
            }
        });
    }

    function getUniqueUserIds(){
        var userIds = {};
        //Gets the unique userIds from statuses
        for(var i=0; i<statuses.statuses.length; i++){
            if(userIds[statuses.statuses[i].userId] === undefined){
                userIds[statuses.statuses[i].userId] = statuses.statuses[i].userId;
            }
            //Gets userIds from comments
            for(var c=0; c<statuses.statuses[i].comments.length; c++){
                if(userIds[statuses.statuses[i].comments[c].userId] === undefined){
                    userIds[statuses.statuses[i].comments[c].userId] = statuses.statuses[i].comments[c].userId;
                }
            }
        }
        return userIds;
    }

    function setProfilePicturesToEmpty(){
        profilePhotos = {};
    }
};