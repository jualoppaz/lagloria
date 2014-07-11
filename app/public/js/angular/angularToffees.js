var angularToffees = angular.module('angularToffees', []);

function mainController($scope, $http) {
    $scope.toffees = {};
    $scope.loguedUser = {};

    // Cuando se cargue la página, pide del API todas las excursiones
    $http.get('/api/toffees')
        .success(function(data) {
            $scope.toffees = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
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