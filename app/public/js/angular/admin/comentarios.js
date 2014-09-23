var app = angular.module('dashboard');

app.controller('ComentariosController', function ($scope, $http){


    /*
    $scope.comentarios = [{
        "user": "Proveedor",
        "texto": "Me encantan estos caramelos. Son estupendos."
    }];
    */

    $scope.comentarioAEliminar = {};


    $scope.comentarios = {};

    var url = window.location.href;

    var fragmentos = url.split("/");

    var id = fragmentos[fragmentos.length-2];

    var categoria = fragmentos[4];

    /*
    if(fragmentos.length == 8){ // Hay subtipo
        var tipo = fragmentos[5];

        $http.get('/api/' + categoria + '/' + tipo + "/" + id)
            .success(function(data){
                alert(data);
                $scope.comentarios = data;
            })
            .error(function(data){
                alert(data);
            });
    }else{
        $http.get('/api/' + categoria + '/' + id)
            .success(function(data){
                alert(data);
                $scope.comentarios = data;
            })
            .error(function(data){
                alert(data);
            });
    }
    */

    $http.get('/api/' + categoria + '/' + id + "/comentarios")
        .success(function(data){
            if(data.comments){
                $scope.comentarios = data.comments;
            }else{
                $scope.comentarios = [];
            }

        })
        .error(function(data){
            alert(data);
        });

    /*
    $scope.verComentario = function(id){
        var url = window.location.href;
        var idCategoria = url.split("/")[5];
        if(url.indexOf('toffees') != -1){
            window.location.href = "/admin/toffees/" + idCategoria + "/comentarios/" + id;
        }
    };
    */

    $scope.eliminarComentario = function(comentario){
        angular.element("#modal-eliminar-comentario").modal('show');

        $scope.comentarioAEliminar.user = comentario.user;
        $scope.comentarioAEliminar.text = comentario.text;

    };


    $scope.eliminarComentarioDefinitivamente = function(){

        var url = window.location.href;

        var fragmentos = url.split("/");

        var categoria = fragmentos[4];

        var id = fragmentos[fragmentos.length-2];

        $http.put('/api/' + categoria + "/" + String(id) + "/comentarios", $scope.comentarioAEliminar)
            .success(function(data){
                if(data.comments == null){
                    $scope.comentarios = {};
                }else{
                    if(data.comments.length == 0){
                        $scope.comentarios = {};
                    }else{
                        $scope.comentarios = data.comments;
                    }
                }
            })
            .error(function(data){
                alert(data);
            })
    };

});