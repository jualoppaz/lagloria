var app = angular.module('dashboard');

app.controller('ComentariosController', function ($scope, $http){

    $scope.comentarios = [{
        "user": "Proveedor",
        "texto": "Me encantan estos caramelos. Son estupendos."
    }];


    /*
    $http.get('/api/users')
        .success(function(data){
            $scope.comentarios = data;
        })
        .error(function(data){
            alert("Ha sucedido algún error. Recargue la página.");
        });


    */




    $scope.verComentario = function(id){
        var url = window.location.href;
        var idCategoria = url.split("/")[5];
        alert(idCategoria);
        if(url.indexOf('toffees') != -1){
            window.location.href = "/admin/toffees/" + idCategoria + "/comentarios/" + id;
        }
    };

    $scope.eliminarComentario = function(id){
        angular.element("#modal-eliminar-comentario").modal('show');
        $scope.usuarioAEliminar = id;
    };

    /*
    $scope.eliminarUsuarioDefinitivamente = function(){
        $http.delete('/api/users/' + String($scope.usuarioAEliminar))
            .success(function(data){
                $scope.usuarios = data;
            })
            .error(function(data){

            })
    };
    */
});