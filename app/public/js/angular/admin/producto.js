var app = angular.module('dashboard');

app.controller('ProductoController', function ($scope, $http, $window){

    // Este usuario es el actual del sistema

    $scope.producto = {};


    // Este usuario parte con los datos actuales, pero es el que se modifica y se envia
    // al servidor
    $scope.nuevoProducto = {};


    var url = window.location.href;

    var fragmentos = url.split("/");

    var categoria = fragmentos[4];

    var tipo = fragmentos[5];

    var productoId = url.split("/")[url.split("/").length-1];

    if(categoria == "toffeesYMasticables" || categoria == "duros"){
        if(tipo == "ponny"){
            tipo = "ponnies";
        }


        $http.get('/api/' + tipo + '/' + String(productoId))
            .success(function(data){
                $scope.nuevoProducto = data;

            })
            .error(function(data){
                alert(data);
            });
    }else{
        $http.get('/api/' + categoria + '/' + String(productoId))
            .success(function(data){
                $scope.nuevoProducto = data;

            })
            .error(function(data){
                alert(data);
            });
    }


    $scope.guardar = function(){

        if(categoria == "grageados" || categoria == "conPalo"){
            $http.put('/api/' + categoria + '/' + String($scope.nuevoProducto._id), $scope.nuevoProducto)
                .success(function(data){
                    angular.element("#modalTitleProductoEditadoCorrectamente").text("Edición correcta");
                    angular.element("#modalTextProductoEditadoCorrectamente").text("El producto ha sido editado correctamente.");
                    angular.element("#modal-productoEditadoCorrectamente").modal('show');
                })
                .error(function(data){
                    alert(data);

                });
        }else{
            $http.put('/api/' + tipo + '/' + String($scope.nuevoProducto._id), $scope.nuevoProducto)
                .success(function(data){
                    angular.element("#modalTitleProductoEditadoCorrectamente").text("Edición correcta");
                    angular.element("#modalTextProductoEditadoCorrectamente").text("El producto ha sido editado correctamente.");
                    angular.element("#modal-productoEditadoCorrectamente").modal('show');
                })
                .error(function(data){
                    alert(data);

                });
        }
    };

    $scope.redirigirTrasEditar = function(){
        var nuevaURL = "/admin/" + categoria;

        $window.location.href = nuevaURL;
    };


});