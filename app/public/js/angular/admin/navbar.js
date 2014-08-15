//var loginNavbar = angular.module('loginNavbar', [])

function navbarController($scope, $http){

    $scope.cerrarSesion = function(){
        $http.get('/api/logout')
            .success(function(data){
                if(data == "ok"){
                    //alert("Ha cerrado sesión correctamente");

                    angular.element("#modalTitleLogout").text("Sesión cerrada correctamente");
                    angular.element("#modalTextLogout").text("Vuelva pronto.");
                    angular.element("#modal-logout").modal('show');

                    $scope.usuarioEstaLogueadoParent = false;

                    // La redireccion esta hecha en cliente, pero seria ideal conseguir hacerla desde el servidor.
                    // El problema es que la redireccion no se lleva bien con las peticiones AJAX.
                }

            })
            .error(function(data){

            });
    };

    $scope.redirigirTrasLogout = function(){
        alert("Entramos en logout");
        window.location.href = "/";
    }

}