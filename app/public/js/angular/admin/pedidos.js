var app = angular.module('dashboard');

app.controller('PedidosController', function($scope, $http){


    $scope.pedidos = [{
        "user": "Proveedor",
        "fecha": "01/09/2014",
        "productos":[{
            "category": "Toffees y Masticables",
            "type": "Toffee",
            "model": "Surtido",
            "_id": "53c00b87dbc8cd8b5c175547"
        }],
        "leido": true
    }];

    $scope.eliminarPedido = function(){
        angular.element("#modal-eliminar-pedido").modal('show');
    }
});