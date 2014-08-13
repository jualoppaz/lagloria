
function sidebar($scope, $http){

    $scope.correosNoLeidos = {};

    $scope.pedidos = 3;

    $http.get('/query/notReadedEmailsNumber')
        .success(function(data){
            $scope.correosNoLeidos = data.emails;
        })
        .error(function(data){

        });
}