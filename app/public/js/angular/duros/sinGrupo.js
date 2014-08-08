var sinGrupo = angular.module('sinGrupo', []);

function mainController($scope, $http) {
    $scope.sinGrupos = {};
    $scope.loguedUser = {};

    /*
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

    $http.get('/api/sinGrupo')
        .success(function(data) {
            if(data.message){
                $scope.sinGrupos = {};
            }else{
                $scope.sinGrupos = data;
            }
        })
        .error(function(data) {
            alert("Ha sucedido algún error. Recargue la página de nuevo. Disculpe las molestias.");
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
    $scope.esSurtido = function(duro){
        return duro.model == "Surtido";
    }
    */
}