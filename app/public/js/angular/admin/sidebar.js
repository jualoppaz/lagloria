
function sidebar($scope, $http){

    $scope.correosNoLeidos = {};

    $http.get('/query/notReadedEmailsNumber')
        .success(function(data){
            $scope.correosNoLeidos = data.emails;
        })
        .error(function(data){

        });
}