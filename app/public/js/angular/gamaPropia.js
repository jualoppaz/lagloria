var gamaPropia = angular.module('gamaPropia', []);

function mainController($scope, $http){

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
}