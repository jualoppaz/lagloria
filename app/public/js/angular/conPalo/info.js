var app = angular.module('lagloria');

app.controller('InfoConPaloController', function ($scope, $http) {
    $scope.producto = {};

    var url = window.location.href.split("/");
    var conPaloId = url[url.length - 1];

    $http.get('/api/conPalo/' + String(conPaloId))
        .success(function(data) {
            if(data.message){
                $scope.producto = {};
            }else{
                $scope.producto = data;
            }
        })
        .error(function(data) {
            alert("No se ha podido cargar la página correctamente. Recargue la página. Gracias.");
        });

});