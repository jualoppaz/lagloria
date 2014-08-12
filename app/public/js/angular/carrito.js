var carrito = angular.module('carrito', []);

function mainController($scope, $http){

    $scope.loguedUser = {};
    $scope.productos = {};

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

    // Llamada AJAX para cerrar sesion

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
    };*/

    $scope.aumentarCantidad = function(producto){
        for(i=0; i<$scope.productos.length;i++){
            if($scope.productos[i]==producto){
                var anterior = $scope.productos[i].quantity;
                var nuevo = Number(anterior) + Number(1);
                $scope.productos[i].quantity = String(nuevo);
                $scope.productos[i].total = $scope.productos[i].quantity * $scope.productos[i].price;
            }
        }
    };

    $scope.reducirCantidad = function(producto){
        if(Number(producto.quantity) > Number(producto.minimumOrder)){
            for(i=0; i<$scope.productos.length;i++){
                if($scope.productos[i]==producto){
                    var anterior = $scope.productos[i].quantity;
                    var nuevo = Number(anterior) - Number(1);
                    $scope.productos[i].quantity = String(nuevo);
                    $scope.productos[i].total = $scope.productos[i].quantity * $scope.productos[i].price;
                }
            }
        }
    };

    $scope.actualizarPrecios = function(producto){
        for(i=0; i<$scope.productos.length;i++){
            if($scope.productos[i]==producto){
                $scope.productos[i].quantity = producto.quantity;
                $scope.productos[i].total = producto.quantity * producto.price;
            }
        }
    };

    $scope.precioTotal = function(){
        var precioTotal = 0;
        for(i=0; i<$scope.productos.length;i++){
            //precioTotal += $scope.productos[i].quantity * $scope.productos[i].price;
            precioTotal += $scope.productos[i].total;
        }
        return precioTotal;
    };

    $http.get('/api/shoppingCart')
        .success(function(data){
            $scope.productos = data;
        })
        .error(function(data){

        });

    $scope.subTotal = function(){
        return this.cantidad * this.price || 0;
    }

    $scope.guardarCambios = function(){
        var json = {
            productos : $scope.productos
        };
        alert("JSON: ");
        for(i=0;i<$scope.productos.length;i++){

        }
        $http.put('/api/shoppingCart', json)
            .success(function(data){
                if(data == "saved"){
                    alert("Carrito guardado correctamente");
                }
            })
            .error(function(data){
                if(data == "error"){
                    alert("No ha colado, pillín.");
                }
            })
    };

    $scope.validarCantidades = function(){

    };
}