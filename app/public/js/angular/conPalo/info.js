var conPaloInfo = angular.module('conPaloInfo', []);

function mainController($scope, $http) {
    $scope.conPalo = {};
    $scope.loguedUser = {};

    var url = window.location.href.split("/");
    var conPaloId = url[url.length - 1];

    // Cuando se cargue la página, pide del API todas las excursiones
    $http.get('/api/conPalo/' + String(conPaloId))
        .success(function(data) {
            if(data.message){
                $scope.conPalo = {};
            }else{
                $scope.conPalo = data;
            }
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

    $scope.esSurtido = function(conPalo){
        return conPalo.model == "Surtido";
    }

}