var app = angular.module('lagloria');

app.controller('GloriaController', function ($scope, $http) {
    $scope.productos = {};

    $http.get('/api/glorias')
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

});