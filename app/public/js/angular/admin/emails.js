var emails = angular.module('emails', []);

function mainController($scope, $http){

    $scope.emails = {};
    $scope.emailAEliminar = {};

    $http.get('/api/emails')
        .success(function(data){
            $scope.emails = data;
        })
        .error(function(data){

        });

    $scope.verEmail = function(id){
        window.location.href = "/emails/" + id;
    };

    $scope.eliminarEmail = function(id){
        angular.element("#modal-eliminar-email").modal('show');
        $scope.emailAEliminar = id;
    };

    $scope.eliminarEmailDefinitivamente = function(){
        alert("Entramos");
        $http.delete('/api/emails/' + String($scope.emailAEliminar))
            .success(function(data){
                $scope.emails = data;
            })
            .error(function(data){

            })
    };
}