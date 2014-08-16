var app = angular.module('lagloria');

app.controller('CrystalController', function ($scope, $http) {
    $scope.crystals = {};

    $http.get('/api/crystals')
        .success(function(data) {
            if(data.message){
                $scope.crystals = {};
            }else{
                $scope.crystals = data;
            }
        })
        .error(function(data) {
            alert("Ha sucedido algún error. Recargue la página de nuevo. Disculpe las molestias.");
        });

});