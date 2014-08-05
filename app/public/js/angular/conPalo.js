var conPalo = angular.module('conPalo', []);

function mainController($scope, $http) {
    $scope.conPalos = {};
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

    $http.get('/api/conPalo')
        .success(function(data) {
            if(data.message){
                $scope.conPalos = {};
            }else{
                $scope.conPalos = data;
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