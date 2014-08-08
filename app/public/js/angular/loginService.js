angular.module('loginService',[])
    .service('LoginService', function($http){
        this.cerrarSesion = function(){
            $http.get('/api/logout')
                .success(function(data){
                    if(data == "ok"){
                        /*alert("Ha cerrado sesión correctamente");
                        $scope.usuarioEstaLogueado = false;*/
                        alert("Data: " + data);
                        return false;
                    }
                })
                .error(function(data){

                });
        }
    });