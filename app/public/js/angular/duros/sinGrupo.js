var app = angular.module('lagloria');

app.controller('SinGrupoController', function ($scope, $http) {
    $scope.sinGrupos = {};

    $http.get('/api/sinGrupo')
        .success(function(data) {
            if(data.message){
                $scope.sinGrupos = {};
            }else{
                $scope.sinGrupos = data;
            }
        })
        .error(function(data) {
            alert("Ha sucedido algún error. Recargue la página de nuevo. Disculpe las molestias.");
        });

});