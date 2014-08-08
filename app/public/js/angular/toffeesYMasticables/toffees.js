var toffees = angular.module('toffees', []);

function mainController($scope, $http) {
    $scope.toffees = {};
    $scope.loguedUser = {};

    $scope.usuarioEstaLogueado = false;

    /*
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

    $scope.cerrarSesion = function(){
        $http.get('/api/logout')
            .success(function(data){
                if(data == "ok"){
                    alert("Ha cerrado sesión correctamente");
                    $scope.usuarioEstaLogueado = false;
                }
            })
            .error(function(data){

            });
    }*/

    $http.get('/api/toffees')
        .success(function(data) {
            if(data.message){
                $scope.toffees = {};
            }else{
                $scope.toffees = data;
            }
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