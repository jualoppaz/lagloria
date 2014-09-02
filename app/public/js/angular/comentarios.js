var app = angular.module('lagloria');

app.controller('ComentariosController', function($scope, $http){


    $scope.comentar = function(){

       $scope.producto.comentarioRealizado = $scope.comentario;

       $http.post('/action/comentar', $scope.producto)
            .success(function(data){
                 angular.element("#modalTitleComentarioRealizado").text("Comentario realizado correctamente");
                 angular.element("#modalTextComentarioRealizado").text("Pulse el botón para continuar");
                 angular.element("#modal-comentarioRealizado").modal('show');
            })
            .error(function(data){

            })
    };

});