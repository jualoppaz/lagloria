var services = angular.module('services', []);

services
    .service('UserService', ['$http', function($http){

        this.solicitarUsuario = function(){
            return $http.get('/api/user');
        };

    }])
    .service('LoginService', ['$http', function($http){

        this.hacerLogin = function(form){
            return $http.post('/api/login', form);
        };

    }]);





