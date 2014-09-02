var app = angular.module('dashboard');

app.controller('UsuarioController', function ($scope, $http){

    // Este usuario es el actual del sistema

    $scope.usuario = {};


    // Este usuario parte con los datos actuales, pero es el que se modifica y se envia
    // al servidor
    $scope.nuevoUsuario = {};


    var url = window.location.href;
    var usuarioId = url.split("/")[url.split("/").length-1];

    $http.get('/api/users/' + String(usuarioId))
        .success(function(data){
            $scope.nuevoUsuario = data;
            $scope.nuevoUsuario.pass = "";

        })
        .error(function(data){

        });
});