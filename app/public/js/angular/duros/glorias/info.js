var app = angular.module('lagloria');

app.controller('InfoGloriaController', function ($scope, $http) {
    $scope.producto = {};

    var url = window.location.href.split("/");
    var gloriaId = url[url.length - 1];

    $http.get('/api/glorias/' + String(gloriaId))
        .success(function(data) {
            $scope.producto = data;
        })
        .error(function(data) {
            alert("No se ha podido cargar la página correctamente. Recargue la página. Gracias.");
        });

});