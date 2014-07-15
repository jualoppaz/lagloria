var masticables = angular.module('masticables', []);

function mainController($scope, $http) {
    $scope.masticables = {};
    $scope.loguedUser = {};

    // Cuando se cargue la página, pide del API todas las excursiones
    $http.get('/api/masticables')
        .success(function(data) {
            $scope.masticables = data;
        })
        .error(function(data) {
            alert("Hay algún error. Recargue de nuevo la página. Disculpe las molestias.");
        });

    /*
    $http.get('/api/user')
        .success(function(data) {
            $scope.loguedUser = data;
        })
        .error(function(data){

        });
    */

    $scope.esSurtido = function(masticable){
        return masticable.model == "Surtido";
    }
}