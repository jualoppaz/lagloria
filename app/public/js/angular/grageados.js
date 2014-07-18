var grageados = angular.module('grageados', []);

function mainController($scope, $http) {
    $scope.grageados = {};
    $scope.loguedUser = {};

    // Cuando se cargue la página, pide del API todas las excursiones
    $http.get('/api/grageados')
        .success(function(data) {
            $scope.grageados = data;
        })
        .error(function(data) {
            alert("No se ha podido cargar la página correctamente. Recargue la página. Gracias.");
        });

    /*
    $http.get('/api/user')
        .success(function(data) {
            $scope.loguedUser = data;
        })
        .error(function(data){

        });
    */

    $scope.esSurtido = function(toffee){
        return toffee.model == "Surtido";
    }
}