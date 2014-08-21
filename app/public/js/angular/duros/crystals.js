var app = angular.module('lagloria');

app.controller('CrystalController', function ($scope, $http) {
    $scope.productos = {};

    $http.get('/api/crystals')
        .success(function(data) {
            if(data.message){
                $scope.productos = {};
            }else{
                $scope.productos = data;
            }
        })
        .error(function(data) {
            alert("Ha sucedido algún error. Recargue la página de nuevo. Disculpe las molestias.");
        });

    $scope.esSurtido = function(producto){
        return producto.image.indexOf("surtido")!= -1 || producto.resizedImage.indexOf("surtido")!= -1;
    }

});