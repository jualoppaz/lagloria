var app = angular.module('lagloria');

app.controller('InfoMasticableController', function($scope, $http) {
    $scope.producto = {};

    var url = window.location.href.split("/");
    var masticableId = url[url.length - 1];

    // Cuando se cargue la página, pide del API todas las excursiones
    $http.get('/api/masticables/' + String(masticableId))
        .success(function(data) {
            $scope.producto = data;
        })
        .error(function(data) {
            alert("No se ha podido cargar la página correctamente. Recargue la página. Gracias.");
        });

    $scope.esSurtido = function(masticable){
        return masticable.model == "Surtido";
    };

});