var app = angular.module('lagloria');

app.controller('IndexController', function ($scope, $http, $filter) {

    $scope.fecha = {};

    $http.get('/lastModified')
        .success(function(data){
            $scope.fecha = data.fecha;
        })
        .error(function(data){
            alert(data);
        })
});




