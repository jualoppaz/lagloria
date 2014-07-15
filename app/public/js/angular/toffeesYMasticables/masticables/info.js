var masticablesInfo = angular.module('masticablesInfo', []);

function mainController($scope, $http) {
    $scope.masticable = {};
    $scope.loguedUser = {};

    var url = window.location.href.split("/");
    var masticableId = url[url.length - 1];

    // Cuando se cargue la página, pide del API todas las excursiones
    $http.get('/api/masticables/' + String(masticableId))
        .success(function(data) {
            $scope.masticable = data;
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