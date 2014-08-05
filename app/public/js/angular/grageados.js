var grageados = angular.module('grageados', []);

function mainController($scope, $http) {
    $scope.grageados = {};
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

    $http.get('/api/grageados')
        .success(function(data) {
            if(data.message){
                $scope.grageados = {};
            }else{
                $scope.grageados = data;
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

    $scope.esSurtido = function(grageado){
        return grageado.model == "Surtido";
    }
}