


function comprarController($scope, $http){
    $scope.anadirAlCarrito = function(){
        alert("Entramos en el controlador comun para comprar");
        var json = {
            id: $scope.producto._id,
            category: $scope.producto.category,
            type: $scope.producto.type
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
}