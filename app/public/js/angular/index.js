var index = angular.module('index', []);

function mainController($scope, $http){

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

    */

    // Llamada AJAX para cerrar sesion

    /*
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

    /*
    $scope.cerrarSesion = function(){
        $scope.$parent.cerrarSesion();
    };
    */

}