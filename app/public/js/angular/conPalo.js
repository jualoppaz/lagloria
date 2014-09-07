var app = angular.module('lagloria');

app.controller('ConPaloController', function ($scope, $http) {
    $scope.productos = {};

    $http.get('/api/conPalo')
        .success(function(data) {
            if(data.message){
                $scope.productos = {};
            }else{
                $scope.productos = data;
            }
        })
        .error(function(data) {
            alert("No se ha podido cargar la página correctamente. Recargue la página. Gracias.");
        });

});