var app = angular.module('lagloria');

app.controller('EspecialController', function ($scope, $http) {

    $scope.productos = {};

    $http.get('/api/especiales')
        .success(function(data) {
            if(data.message){
                $scope.productos = {};
            }else{
                $scope.productos = data;
            }
        })
        .error(function(data) {
            alert("Ha sucedido algún error. Recargue la página de nuevo. Disculpe las molestias.");
        });

});