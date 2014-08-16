var app = angular.module('lagloria');

app.controller('GloriaController', function ($scope, $http) {
    $scope.glorias = {};

    $http.get('/api/glorias')
        .success(function(data) {
            if(data.message){
                $scope.glorias = {};
            }else{
                $scope.glorias = data;
            }
        })
        .error(function(data) {
            alert("Ha sucedido algún error. Recargue la página de nuevo. Disculpe las molestias.");
        });

});