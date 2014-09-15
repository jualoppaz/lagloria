// Controlador Base. Por eso es el único que tiene dependencias

var app = angular.module('lagloria', ['services']);

app.controller('LoguedUserController', function($scope, UserService, $http, $window){
    $scope.usuarioEstaLogueado = false;

    $scope.usuarioLogueado = {};

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
                $scope.usuarioLogueado = data;
            })
            .error(function(data){
                if(data == "not-loguedin-user"){
                    $scope.usuarioEstaLogueado = false;
                }
            });
    }

    $scope.cerrarSesion = function(){
        $http.get('/api/logout')
            .success(function(data){
                if(data == "ok"){
                    //alert("Ha cerrado sesión correctamente");

                    angular.element("#modalTitleLogout").text("Sesión cerrada correctamente");
                    angular.element("#modalTextLogout").text("Vuelva pronto.");
                    angular.element("#modal-logout").modal('show');

                    $scope.usuarioEstaLogueado = false;

                    // La redireccion esta hecha en cliente, pero seria ideal conseguir hacerla desde el servidor.
                    // El problema es que la redireccion no se lleva bien con las peticiones AJAX.

                }

            })
            .error(function(data){
                alert(data);
            });
    };

    $scope.redirigirTrasLogout = function(){
        //$window.location.href = window.location.href;
        $window.location.reload();
    };
});

