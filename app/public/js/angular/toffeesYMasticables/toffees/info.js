var app = angular.module('lagloria');

app.controller('InfoToffeeController', function($scope, $http) {
    $scope.producto = {};

    var url = window.location.href.split("/");
    var toffeeId = url[url.length - 1];

    // Cuando se cargue la página, pide del API todas las excursiones
    $http.get('/api/toffees/' + String(toffeeId))
        .success(function(data) {
            $scope.producto = data;
        })
        .error(function(data) {
            alert("No se ha podido cargar la página correctamente. Recargue la página. Gracias.");
        });

});