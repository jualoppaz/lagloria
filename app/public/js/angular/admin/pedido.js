var app = angular.module('dashboard');

app.controller('PedidoController', function($scope, $http){


    /*
    $scope.pedido = {
        "user": "Proveedor",
        "fecha": "01/09/2014",
        "productos":[{
            "category": "Toffees y Masticables",
            "type": "Toffee",
            "model": "Surtido",
            "_id": "53c00b87dbc8cd8b5c175547",
            "quantity": "150",
            "price": "3",
            "minimumOrder": "100"
        }],
        "leido": true
    };
    */

    $scope.pedido = {};
    $scope.pedido.productos = {};

    var url = window.location.href;
    var fragmentos = url.split("/");
    var id = fragmentos[fragmentos.length-1];

    $http.get('/api/orders/' + String(id))
        .success(function(data){
            $scope.pedido = data;
        })
        .error(function(data){

        });

    $scope.subTotal = function(){
        return (this.cantidad * this.price) || 0;
    };

    $scope.precioTotal = function(){
        var precioTotal = 0;
        for(i=0; i<$scope.pedido.productos.length;i++){
            //precioTotal += $scope.productos[i].quantity * $scope.productos[i].price;
            precioTotal += $scope.pedido.productos[i].total;
        }
        return precioTotal;
    };

    $scope.aumentarCantidad = function(producto){
        for(i=0; i<$scope.pedido.productos.length;i++){
            if($scope.pedido.productos[i]==producto){
                var anterior = $scope.pedido.productos[i].quantity;
                var nuevo = Number(anterior) + Number(1);
                $scope.pedido.productos[i].quantity = String(nuevo);
                $scope.pedido.productos[i].total = $scope.pedido.productos[i].quantity * $scope.pedido.productos[i].price;
            }
        }
    };

    $scope.reducirCantidad = function(producto){
        if(Number(producto.quantity) > Number(producto.minimumOrder)){
            for(i=0; i<$scope.pedido.productos.length;i++){
                if($scope.pedido.productos[i]==producto){
                    var anterior = $scope.pedido.productos[i].quantity;
                    var nuevo = Number(anterior) - Number(1);
                    $scope.pedido.productos[i].quantity = String(nuevo);
                    $scope.pedido.productos[i].total = $scope.pedido.productos[i].quantity * $scope.pedido.productos[i].price;
                }
            }
        }
    };


    $scope.actualizarPrecios = function(producto){
        for(i=0; i<$scope.pedido.productos.length;i++){
            if($scope.pedido.productos[i]==producto){
                $scope.pedido.productos[i].quantity = producto.quantity;
                $scope.pedido.productos[i].total = producto.quantity * producto.price;
            }
        }
    };

    $scope.editarPedido = function(){
        $http.put('/api/orders', $scope.pedido)
            .success(function(data){
                angular.element("#modalTitlePedidoEditadoCorrectamente").text("Edición correcta");
                angular.element("#modalTextPedidoEditadoCorrectamente").text("El pedido ha sido editado correctamente.");
                angular.element("#modal-pedidoEditadoCorrectamente").modal('show');
            })
            .error(function(data){
                alert(data);
            })
    };

    $scope.redirigirTrasEditar = function(){
        //$window.location.href = "/pedidos";
    };

})