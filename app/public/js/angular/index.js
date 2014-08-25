var app = angular.module('lagloria');

app.controller('IndexController', function ($scope, $http) {

    $scope.fecha = "empty";

    $http.get('/lastModified')
        .success(function(data){
            $scope.fecha = data.fecha;
        })
        .error(function(data){
            if(data == "not-avaible"){
                $scope.fecha = "No disponible";
            }else if(data == "local-environment"){
                $scope.fecha = "Estamos en local";
            }

        })
});




