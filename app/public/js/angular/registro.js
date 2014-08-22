var app = angular.module('lagloria');

app.controller('SignupController', function ($scope, $http, $timeout, $window) {
    $scope.caramelos = {};
    $scope.loguedUser = {};

    $scope.form = {};
    $scope.errores = {};
    $scope.errores.usuarioInvalido = "Debe introducir un usuario válido. Los espacios no están permitidos.";
    $scope.errores.passInvalido = "Debe introducir una contraseña válida. Los espacios no están permitidos.";
    $scope.usuarioOcupado = "El usuario introducido está en uso. Introduzca otro.";
    $scope.registroOk = "Ha sido registrado con éxito.";

    $scope.usuarioInvalido = false;
    $scope.passInvalido = false;
    $scope.registroConExito = false;
    $scope.usuarioEnUso = false;

    $scope.hayErrores = false;

    $scope.reiniciarMensajes = function(){
        $scope.hayErrores = false;
        $scope.usuarioInvalido = false;
        $scope.passInvalido = false;
        $scope.registroConExito = false;
        $scope.usuarioEnUso = false;
    }

    $scope.registrarse = function(){
        $scope.reiniciarMensajes();
        var usuario = String($scope.form.user);
        var pass = String($scope.form.pass);

        if(usuario == 'undefined' || usuario.length == 0){
            $scope.errores.usuario = "Debe introducir un usuario.";
            $scope.usuarioInvalido = true;
            $scope.hayErrores = true;
        }else{
            for(i=0; i<usuario.length;i++){
                if(usuario.charAt(i) == " "){
                    $scope.usuarioInvalido = true;
                    $scope.hayErrores = true;
                }
            }

        }
        if(pass == 'undefined' || pass.length == 0){
            //alert("Debe introducir una contraseña.");
            $scope.passInvalido = true;
            $scope.hayErrores = true;
        }else{
            for(i=0; i<pass.length;i++){
                if(pass.charAt(i) == " "){
                    $scope.passInvalido = true;
                    $scope.hayErrores = true;
                }
            }

        }
        if(!$scope.hayErrores){
            $http.post('/api/signup', $scope.form)
                .success(function(data){
                    if(data == "ok"){
                        $scope.registroConExito = true;
                        $timeout(function(){
                            $window.location = "/login";
                        },2000);
                    }
                })
                .error(function(data){
                    if(data == "username-taken"){
                        $scope.usuarioEnUso = true;
                    }
                });
        }
    };
});