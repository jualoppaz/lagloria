var app = angular.module('dashboard');

app.controller('ToffeeController', function ($scope, $http){

    // Este usuario es el actual del sistema

    $scope.producto = {};


    // Este usuario parte con los datos actuales, pero es el que se modifica y se envia
    // al servidor
    $scope.nuevoProducto = {};


    var url = window.location.href;
    var productoId = url.split("/")[url.split("/").length-1];

    $http.get('/api/toffees/' + String(productoId))
        .success(function(data){
            $scope.nuevoProducto = data;

        })
        .error(function(data){

        });
});