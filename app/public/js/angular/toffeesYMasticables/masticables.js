var masticables = angular.module('masticables', []);

function mainController($scope, $http) {
    $scope.masticables = {};
    $scope.loguedUser = {};

    $scope.usuarioEstaLogueado = false;

    $http.get('/api/user')
        .success(function(data){
            $scope.usuarioEstaLogueado = true;
            $scope.loguedUser = data;
        })
        .error(function(data){
            if(data == "not-loguedin-user"){
                $scope.usuarioEstaLogueado = false;
            }
        });

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

    /*
    $http.get('/api/user')
        .success(function(data) {
            $scope.loguedUser = data;
        })
        .error(function(data){

        });
    */

    $scope.esSurtido = function(masticable){
        return masticable.model == "Surtido";
    }
}