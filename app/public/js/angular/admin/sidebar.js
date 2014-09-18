var app = angular.module('dashboard');

app.controller('SidebarController', function ($scope, $http){

    $scope.correosNoLeidos = {};

    $scope.pedidos = {};

    $scope.usuariosNuevos = {};

    $http.get('/query/notReadedEmailsNumber')
        .success(function(data){
            $scope.correosNoLeidos = data.emails;
        })
        .error(function(data){
            alert(data);
        });

    $http.get('/query/notReadedOrders')
        .success(function(data){
            $scope.pedidos = data.orders;
        })
        .error(function(data){
            alert(data);
        });

    $http.get('/query/newUsers')
        .success(function(data){
            $scope.usuariosNuevos = data.newUsers;
        })
        .error(function(data){
            alert(data);
        })

});