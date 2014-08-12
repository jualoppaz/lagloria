//var loginNavbar = angular.module('loginNavbar', [])

function loginNavbarController($scope, $http){

    $scope.usuarioEstaLogueadoParent = false;

    $scope.loguedUser = {};

    $http.get('/api/user')
        .success(function(data){
            $scope.usuarioEstaLogueadoParent = true;
            $scope.loguedUser = data;
        })
        .error(function(data){
            if(data == "not-loguedin-user"){
                $scope.usuarioEstaLogueadoParent = false;
            }
        });

    $scope.cerrarSesion = function(){
        $http.get('/api/logout')
            .success(function(data){
                if(data == "ok"){
                    alert("Ha cerrado sesión correctamente");
                    $scope.usuarioEstaLogueadoParent = false;

                    // La redireccion esta hecha en cliente, pero seria ideal conseguir hacerla desde el servidor.
                    // El problema es que la redireccion no se lleva bien con las peticiones AJAX.
                    location.href = "/";
                }

            })
            .error(function(data){

            });
    }
}