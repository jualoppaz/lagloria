var app = angular.module('lagloria');

app.controller('MasticablesController', function($scope, $http) {
    $scope.masticables = {};
    $scope.loguedUser = {};

    $http.get('/api/masticables')
        .success(function(data) {
            if(data.message){
                $scope.masticables = {};
            }else{
                $scope.masticables = data;
            }
        })
        .error(function(data) {
            alert("Hay algún error. Recargue de nuevo la página. Disculpe las molestias.");
        });

    $scope.esSurtido = function(masticable){
        return masticable.model == "Surtido";
    };
});