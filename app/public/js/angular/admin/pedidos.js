var app = angular.module('dashboard');

app.controller('PedidosController', function($scope, $http, $window){

    $scope.pedidos = {};

    $scope.eliminarPedido = function(pedido){
        $scope.pedidoAEliminar = pedido;
        angular.element("#modal-eliminar-pedido").modal('show');
    };

    $scope.eliminarPedidoDefinitivamente = function(){
        $http.delete('/api/orders/' + String($scope.pedidoAEliminar._id))
            .success(function(data){
                $scope.pedidos = data;
                $window.location.reload();
            })
            .error(function(data){
                alert(data);
            });
    };

    $http.get('/api/orders')
        .success(function(data){
            $scope.pedidos = data;
        })
        .error(function(data){

        });

    $scope.verPedido = function(id){
        $window.location.href = '/pedidos/' + String(id);
    };

});