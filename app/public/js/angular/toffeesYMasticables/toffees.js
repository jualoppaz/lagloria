var app = angular.module('lagloria');

app.controller('ToffeesController', function($scope, $http) {
    $scope.toffees = {};
    $scope.loguedUser = {};

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

    $scope.esSurtido = function(toffee){
        return toffee.model == "Surtido";
    }
});