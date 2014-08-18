var app = angular.module('lagloria');

app.controller('LoginController', function ($scope, $http) {
    $scope.loguedUser = {};
    $scope.usuarioEstaLogueado = false;

    $scope.form = {};
    $scope.errores = {};
    $scope.hayErrores = false;
    $scope.errores.usuarioInexistente = "El usuario introducido no existe.";
    $scope.errores.usuarioVacio = "Debe introducir un usuario.";
    $scope.errores.passErroneo = "La contraseña introducida es errónea. Pruebe de nuevo.";
    $scope.errores.passVacio = "Debe introducir una contraseña.";

    $scope.passErroneo = false;
    $scope.usuarioInexistente = false;
    $scope.usuarioVacio = false;

    $scope.reiniciarMensajes = function(){
        $scope.passErroneo = false;
        $scope.usuarioInexistente = false;
        $scope.usuarioVacio = false;
        $scope.passVacio = false;
        $scope.hayErrores = false;
    };

    $scope.loguearse = function(){
        $scope.reiniciarMensajes();
        var usuario = String($scope.form.user);
        var pass = String($scope.form.pass);
        if(angular.element("#recordar").checked){
            $scope.form.recordar = true;
        }
        if(usuario == 'undefined' || usuario == ""){
            $scope.usuarioVacio = true;
            $scope.hayErrores = true;
        }
        if(pass == 'undefined' || pass == ""){
            $scope.passVacio = true;
            $scope.hayErrores = true;
        }

        if(!$scope.hayErrores){
            if(usuario != 'undefined' && pass != 'undefined' && usuario.indexOf(" ") == -1 && pass.indexOf(" ") == -1){
                $http.post('/api/login', $scope.form)
                    .success(function(data){
                        //alert("Login correcto");
                        /*
                        $http.get('/api/lastURL')
                            .success(function(data2){
                                if(data2.indexOf("/login")!= -1 || data2.indexOf("/") == -1){
                                    window.location.href= '/';
                                }else{
                                    window.location.href = data2;
                                }
                            })
                            .error(function(data){

                            })
                        */

                        angular.element("#modalTitleLogin").text("Login correcto");
                        angular.element("#modalTextLogin").text("Pulse el botón para continuar");
                        angular.element("#modal-login").modal('show');
                    })
                    .error(function(data){
                        alert(data);
                        if(data == "invalid-password"){
                            $scope.passErroneo = true;
                        }else if(data == "user-not-found"){
                            $scope.usuarioInexistente = true;
                        }
                    });
            }
        }
    };

    $scope.redirigirTrasLogin = function(){
        $http.get('/api/lastURL')
            .success(function(data){
                if(data.indexOf('/login')!= -1 || data.indexOf('/') != -1){
                    window.location.href = '/';
                }else{
                    window.location.href = data;
                }
            })
            .error(function(data){
                alert(data);
            })
    };

});