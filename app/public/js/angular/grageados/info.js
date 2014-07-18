var grageadoInfo = angular.module('grageadoInfo', []);

function mainController($scope, $http) {
    $scope.grageado = {};
    $scope.loguedUser = {};

    var url = window.location.href.split("/");
    var grageadoId = url[url.length - 1];

    // Cuando se cargue la página, pide del API todas las excursiones
    $http.get('/api/grageados/' + String(grageadoId))
        .success(function(data) {
            $scope.grageado = data;
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

    $scope.esSurtido = function(masticable){
        return masticable.model == "Surtido";
    }

}