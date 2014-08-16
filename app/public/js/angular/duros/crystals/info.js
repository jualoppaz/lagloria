var app = angular.module('lagloria');

app.controller('InfoCrystalController', function ($scope, $http) {
    $scope.producto = {};

    var url = window.location.href.split("/");
    var masticableId = url[url.length - 1];

    $http.get('/api/crystals/' + String(masticableId))
        .success(function(data) {
            $scope.producto = data;
        })
        .error(function(data) {
            alert("No se ha podido cargar la página correctamente. Recargue la página. Gracias.");
        });

});