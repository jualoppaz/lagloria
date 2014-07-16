var ponnies = angular.module('ponnies', []);

function mainController($scope, $http) {
    $scope.ponnies = {};
    $scope.loguedUser = {};

    // Cuando se cargue la página, pide del API todas las excursiones
    $http.get('/api/ponnies')
        .success(function(data) {
            $scope.ponnies = data;
        })
        .error(function(data) {
            alert("Ha sucedido algún error. Recargue la página de nuevo. Disculpe las molestias.");
        });

    /*
    $http.get('/api/user')
        .success(function(data) {
            $scope.loguedUser = data;
        })
        .error(function(data){

        });
    */

    /*
    $scope.esSurtido = function(duro){
        return duro.model == "Surtido";
    }
    */
}