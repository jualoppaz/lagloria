var grageadoInfo = angular.module('grageadoInfo', []);

function mainController($scope, $http) {
    $scope.grageado = {};
    $scope.loguedUser = {};

    $scope.usuarioEstaLogueado = false;

    $http.get('/api/user')
        .success(function(data){
            $scope.usuarioEstaLogueado = true;
            $scope.loguedUser = data;
        })
        .error(function(data){
            if(data == "not-loguedin-user"){
                $scope.usuarioEstaLogueado = false;
            }
        });

    var url = window.location.href.split("/");
    var grageadoId = url[url.length - 1];

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