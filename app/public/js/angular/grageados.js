var app = angular.module('lagloria');

app.controller('GrageadoController', function ($scope, $http) {
    $scope.grageados = {};

    $http.get('/api/grageados')
        .success(function(data) {
            if(data.message){
                $scope.grageados = {};
            }else{
                $scope.grageados = data;
            }
        })
        .error(function(data) {
            alert("No se ha podido cargar la página correctamente. Recargue la página. Gracias.");
        });

});