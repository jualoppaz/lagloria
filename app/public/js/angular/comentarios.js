var app = angular.module('lagloria');

app.controller('ComentariosController', function($scope, $http){


    $scope.comentar = function(){

       $scope.producto.comment = $scope.comentario;

       $http.post('/action/comentar', $scope.producto)
            .success(function(data){
                $scope.producto = data;
                angular.element("#modalTitleComentarioRealizado").text("Comentario realizado correctamente");
                angular.element("#modalTextComentarioRealizado").text("Pulse el botón para continuar");
                angular.element("#modal-comentarioRealizado").modal('show');
                $scope.comentario = "";
            })
            .error(function(data){

            })
    };

    $scope.hayComentarios = function(){
        if($scope.producto.comments == undefined){
            return false;
        }else{
            return $scope.producto.comments.length > 0;
        }
    }

});