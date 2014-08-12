var emails = angular.module('emails', []);

function mainController($scope, $http){

    $scope.emails = {};

    $http.get('/api/emails')
        .success(function(data){
            $scope.emails = data;
        })
        .error(function(data){

        });

    $scope.verEmail = function(email){
        var emailId = email._id;

        window.location.href = "/emails/" + emailId;
    }
}