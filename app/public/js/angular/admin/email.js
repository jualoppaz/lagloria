var email = angular.module('email', []);

function mainController($scope, $http){

    $scope.email = {};

    var url = window.location.href;
    var emailId = url.split("/")[url.split("/").length-1];

    $http.get('/api/emails/' + String(emailId))
        .success(function(data){
            $scope.email = data;
            alert(data);

        })
        .error(function(data){

        });
}