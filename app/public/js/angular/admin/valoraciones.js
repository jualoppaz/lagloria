var app = angular.module('dashboard');

app.controller('ValoracionesController', function ($scope, $http){


    $scope.likes = {};
    $scope.dislikes = {};

    var url = window.location.href;

    var fragmentos = url.split("/");

    var id = fragmentos[fragmentos.length-2];

    if(url.indexOf('/toffees/') != -1){
        $http.get('/api/toffeesYMasticables/' + String(id) + "/valoraciones")
            .success(function(data){
                $scope.likes = data.likes;
                $scope.dislikes = data.dislikes;
            })
            .error(function(data){
                alert(data);
            })
    }else if(url.indexOf('/masticables/') != -1){
        $http.get('/api/toffeesYMasticables/masticables/' + String(id) + "/valoraciones")
            .success(function(data){
                $scope.likes = data.likes;
                $scope.dislikes = data.dislikes;
            })
            .error(function(data){
                alert(data);
            })
    }


    $scope.verComentario = function(id){
        var url = window.location.href;
        var idCategoria = url.split("/")[5];
        if(url.indexOf('toffees') != -1){
            window.location.href = "/admin/toffees/" + idCategoria + "/comentarios/" + id;
        }
    };

    $scope.eliminarComentario = function(id){
        angular.element("#modal-eliminar-comentario").modal('show');
        $scope.usuarioAEliminar = id;
    };


    $scope.eliminarComentarioDefinitivamente = function(){

        var url = window.location.href;

        var fragmentos = url.split("/");

        var categoria = fragmentos[4];

        var id = fragmentos[fragmentos.length-2];

        $http.delete('/api/' + categoria + "/" + String(id) + "/comentarios")
            .success(function(data){
                $scope.comentarios = data;
            })
            .error(function(data){
                alert(data);
            })
    };

});