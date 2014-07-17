var sinGrupoInfo = angular.module('sinGrupoInfo', []);

function mainController($scope, $http) {
    $scope.sinGrupo = {};
    $scope.loguedUser = {};

    var url = window.location.href.split("/");
    var sinGrupoId = url[url.length - 1];

    // Cuando se cargue la página, pide del API todas las excursiones
    $http.get('/api/sinGrupo/' + String(sinGrupoId))
        .success(function(data) {
            $scope.sinGrupo = data;
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

    /*
    $scope.esSurtido = function(masticable){
        return masticable.model == "Surtido";
    }
    */

}