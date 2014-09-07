var app = angular.module('lagloria');

app.controller('MasticablesController', function($scope, $http) {
    $scope.productos = {};

    $http.get('/api/masticables')
        .success(function(data) {
            $scope.productos = data;
        })
        .error(function(data) {
            alert("Hay algún error. Recargue de nuevo la página. Disculpe las molestias.");
        });

});