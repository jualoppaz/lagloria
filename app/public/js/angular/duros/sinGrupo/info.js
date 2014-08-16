var app = angular.module('lagloria');

app.controller('InfoSinGrupoController', function ($scope, $http) {
    $scope.producto = {};

    var url = window.location.href.split("/");
    var sinGrupoId = url[url.length - 1];

    $http.get('/api/sinGrupo/' + String(sinGrupoId))
        .success(function(data) {
            $scope.producto = data;
        })
        .error(function(data) {
            alert("No se ha podido cargar la página correctamente. Recargue la página. Gracias.");
        });

});