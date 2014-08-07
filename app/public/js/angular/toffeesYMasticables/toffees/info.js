var toffeeInfo = angular.module('toffeeInfo', []);

function mainController($scope, $http) {
    $scope.toffee = {};
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
    }

    $scope.anadirAlCarrito = function(){
        var json = {
            id: $scope.toffee._id,
            category: $scope.toffee.category,
            type: $scope.toffee.type
        };

        $http.post('/api/shoppingCart', json)
            .success(function(data){
                if(data == "ok"){
                    alert("El producto ha sido añadido al carrito.");
                }
                alert("Categoria: " + data.category + "\nTipo: " + data.type + "\nModelo: " + data.model);
            })
            .error(function(data){
                if(data == "product-already-exists"){
                    alert("El producto estaba añadido en el carrito con anterioridad.");
                }
            });
    };

    var url = window.location.href.split("/");
    var toffeeId = url[url.length - 1];

    // Cuando se cargue la página, pide del API todas las excursiones
    $http.get('/api/toffees/' + String(toffeeId))
        .success(function(data) {
            $scope.toffee = data;
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

    $scope.esSurtido = function(toffee){
        //alert("Modelo: " + toffee.model);
        return toffee.model == "Surtido";
    }

}