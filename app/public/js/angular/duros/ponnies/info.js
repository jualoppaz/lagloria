var app = angular.module('lagloria');

app.controller('InfoPonnyController', function($scope, $http) {
    $scope.producto = {};

    var url = window.location.href.split("/");
    var ponnyId = url[url.length - 1];

    $http.get('/api/ponnies/' + String(ponnyId))
        .success(function(data) {
            $scope.producto = data;
        })
        .error(function(data) {
            alert("No se ha podido cargar la página correctamente. Recargue la página. Gracias.");
        });

});