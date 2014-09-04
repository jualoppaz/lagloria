var app = angular.module('lagloria');

app.controller('ValoracionesController', function($scope, $http){

    $scope.hacerLike = function(){
        $http.post('/action/like', $scope.producto)
            .success(function(data){
                $scope.producto = data;
            })
            .error(function(data){
                if(data == "user-has-already-voted"){
                    angular.element("#modalTitleUsuarioYaHabiaVotado").text("Error");
                    angular.element("#modalTextUsuarioYaHabiaVotado").text("Usted ya ha votado este producto con anterioridad");
                    angular.element("#modal-usuarioYaHabiaVotado").modal('show');
                }
            })
    };

    $scope.hacerDislike = function(){
        $http.post('/action/dislike', $scope.producto)
            .success(function(data){
                $scope.producto = data;
            })
            .error(function(data){
                if(data == "user-has-already-voted"){
                    angular.element("#modalTitleUsuarioYaHabiaVotado").text("Error");
                    angular.element("#modalTextUsuarioYaHabiaVotado").text("Usted ya ha votado este producto con anterioridad");
                    angular.element("#modal-usuarioYaHabiaVotado").modal('show');
                }
            })
    };

});