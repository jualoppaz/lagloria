var sinGrupo = angular.module('sinGrupo', []);

function mainController($scope, $http) {
    $scope.sinGrupos = {};
    $scope.loguedUser = {};

    // Cuando se cargue la página, pide del API todas las excursiones
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

    /*
    $http.get('/api/user')
        .success(function(data) {
            $scope.loguedUser = data;
        })
        .error(function(data){

        });
    */

    /*
    $scope.esSurtido = function(duro){
        return duro.model == "Surtido";
    }
    */
}