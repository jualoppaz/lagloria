// Controlador Base. Por eso es el único que tiene dependencias

var app = angular.module('lagloria', ['services']);

app.controller('LoguedUserController', function($scope, UserService){
    $scope.usuarioEstaLogueado = false;

    /*
     Esta variable se usa para mostrar las imagenes sin optimizar (true) o
     las imagenes redimensionadas (false)
    */

    $scope.imagenesOriginales = false;

    getUser();

    function getUser(){
        UserService.solicitarUsuario()
            .success(function(data){
                $scope.usuarioEstaLogueado = true;
            })
            .error(function(data){
                if(data == "not-loguedin-user"){
                    $scope.usuarioEstaLogueado = false;
                }
            });
    }
});

