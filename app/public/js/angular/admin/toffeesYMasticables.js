var app = angular.module('dashboard');

app.controller('ToffeesYMasticablesController', function($scope, $http){

    $scope.productos = {};

    $http.get('/api/toffeesYMasticables')
        .success(function(data){
            $scope.productos = data;
        })
        .error(function(data){

        })

    $scope.verProducto = function(producto){
        if(producto.type == "Toffee"){
            window.location.href = "/admin/toffees/" + producto._id;
        }else if(producto.type == "Masticable"){
            window.location.href = "/admin/masticables/" + producto._id;
        }
    };

    $scope.eliminarProducto = function(id){
        angular.element("#modal-eliminar-producto").modal('show');
        $scope.productoAEliminar = id;
    };

    $scope.verComentarios = function(producto){
        if(producto.type == "Toffee"){
            window.location.href = "/admin/toffees/" + producto._id + "/comentarios";
        }else if(producto.type == "Masticable"){
            window.location.href = "/admin/masticables/" + producto._id + "/comentarios";
        }
    }

});