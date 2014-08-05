var gloriaInfo = angular.module('gloriaInfo', []);

function mainController($scope, $http) {
    $scope.gloria = {};
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
    var gloriaId = url[url.length - 1];

    // Cuando se cargue la página, pide del API todas las excursiones
    $http.get('/api/glorias/' + String(gloriaId))
        .success(function(data) {
            $scope.gloria = data;
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