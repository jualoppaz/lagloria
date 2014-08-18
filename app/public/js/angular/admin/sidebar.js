var app = angular.module('dashboard');

app.controller('SidebarController', function ($scope, $http){

    $scope.correosNoLeidos = {};

    $scope.pedidos = {};

    $http.get('/query/notReadedEmailsNumber')
        .success(function(data){
            $scope.correosNoLeidos = data.emails;
        })
        .error(function(data){

        });

    $http.get('/query/notReadedOrders')
        .success(function(data){
            $scope.pedidos = data.orders;
        })
        .error(function(data){

        })

});