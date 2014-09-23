var app = angular.module('dashboard');

app.controller('UsuariosController', function ($scope, $http){

    $scope.usuarios = {};

    $http.get('/api/users')
        .success(function(data){
            $scope.usuarios = data;
        })
        .error(function(data){
            alert("Ha sucedido algún error. Recargue la página.");
        });

    $scope.verUsuario = function(id){
        window.location.href = "/admin/usuarios/" + id;
    };

    $scope.eliminarUsuario = function(id){
        angular.element("#modal-eliminar-usuario").modal('show');
        $scope.usuarioAEliminar = id;
    };

    $scope.eliminarUsuarioDefinitivamente = function(){
        $http.delete('/api/users/' + String($scope.usuarioAEliminar))
            .success(function(data){
                $scope.usuarios = data;
            })
            .error(function(data){

            })
    };
});