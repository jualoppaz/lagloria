var crystals = angular.module('crystals', []);

function mainController($scope, $http) {
    $scope.crystals = {};
    $scope.loguedUser = {};

    // Cuando se cargue la página, pide del API todas las excursiones
    $http.get('/api/crystals')
        .success(function(data) {
            $scope.crystals = data;
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