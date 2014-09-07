var app = angular.module('lagloria');

app.controller('GrageadoController', function ($scope, $http) {
    $scope.productos = {};

    $http.get('/api/grageados')
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