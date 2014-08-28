var app = angular.module('lagloria');


app.controller('ComprarController', function ($scope, $http){
    $scope.anadirAlCarrito = function(){
        var json = {
            id: $scope.producto._id,
            category: $scope.producto.category,
            type: $scope.producto.type
        };

        $http.post('/api/shoppingCart', json)
            .success(function(data){
                if(data == "ok"){
                    angular.element("#modalTitleComprarProducto").text("Producto añadido al carrito");
                    angular.element("#modalTextComprarProducto").text("Pulse el botón para continuar");
                    angular.element("#modal-comprarProducto").modal('show');
                }
                //alert("Categoria: " + data.category + "\nTipo: " + data.type + "\nModelo: " + data.model);
            })
            .error(function(data){
                if(data == "product-already-exists"){
                    alert("El producto estaba añadido en el carrito con anterioridad.");
                }
            });
    };
});