var app = angular.module('lagloria');

app.controller('ToffeesController', function($scope, $http) {
    $scope.toffees = {};

    $http.get('/api/toffees')
        .success(function(data) {
            if(data.message){
                $scope.toffees = {};
            }else{
                $scope.toffees = data;
            }
        })
        .error(function(data) {
            alert(data);
        });

});





