var app = angular.module('lagloria');

app.controller('SignupController', function ($scope, $http) {
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

    $scope.reiniciarMensajes = function(){
        $scope.usuarioInvalido = false;
        $scope.passInvalido = false;
        $scope.registroConExito = false;
        $scope.usuarioEnUso = false;
    }

    $scope.registrarse = function(){
        $scope.reiniciarMensajes();
        var usuario = String($scope.form.user);
        var pass = String($scope.form.pass);
        //alert("Usuario: " + usuario);
        //alert("Pass: " + pass);
        if(usuario == 'undefined'){
            //alert("Debe introducir un usuario.");
            $scope.errores.usuario = "Debe introducir un usuario.";
            $scope.usuarioInvalido = true;
        }else{
            if(usuario.indexOf(" ") != -1){
                //alert("Debe introducir un usuario válido.");
                $scope.usuarioInvalido = true;
            }
        }
        if(pass == 'undefined'){
            //alert("Debe introducir una contraseña.");
            $scope.passInvalido = true;
        }else{
            if(pass.indexOf(" ") != -1){
                //alert("Debe introducir una contraseña válida");
                $scope.passInvalido = true;
            }
        }
        if(usuario != 'undefined' && pass != 'undefined' && usuario.indexOf(" ") == -1 && pass.indexOf(" ") == -1){
            $http.post('/api/signup', $scope.form)
                .success(function(data){
                    if(data == "ok"){
                        $scope.registroConExito = true;
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