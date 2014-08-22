var app = angular.module('lagloria');

app.controller('InfoMasticableController', function($scope, $http) {
    $scope.producto = {};
    $scope.numeros = [];


    var url = window.location.href.split("/");
    var masticableId = url[url.length - 1];

    // Cuando se cargue la página, pide del API todas las excursiones
    $http.get('/api/masticables/' + String(masticableId))
        .success(function(data) {
            $scope.producto = data;
            for(i=0;i<$scope.producto.avaibleSavours.length; i++){
                $scope.numeros[i] = i+1;
            }

        })
        .error(function(data) {
            alert("No se ha podido cargar la página correctamente. Recargue la página. Gracias.");
        });

});