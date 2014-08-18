//var loginNavbar = angular.module('loginNavbar', [])

var app = angular.module('dashboard');

app.controller('navbarController', function ($scope, $http, $window, $timeout){

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

            });
    };

    $scope.redirigirTrasLogout = function(){
        /*$timeout(function() {
            $window.location.href = "/";
        }, 2000);
        */
        $window.location.href = "/";
    };

});