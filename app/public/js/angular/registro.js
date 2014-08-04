var registro = angular.module('registro', []);

function mainController($scope, $http) {
    $scope.caramelos = {};
    $scope.loguedUser = {};

    $scope.form = {};
    $scope.errores = {};

    $scope.registrarse = function(){
        var usuario = String($scope.form.user);
        var pass = String($scope.form.pass);
        alert("Usuario: " + usuario);
        alert("Pass: " + pass);
        if(usuario == 'undefined'){
            alert("Debe introducir un usuario.");
            $scope.errores.usuario = "Debe introducir un usuario.";
        }else{
            if(usuario.indexOf(" ") != -1){
                alert("Debe introducir un usuario válido.");
                $scope.errores.usuario = "Debe introducir un usuario válido.";
            }
        }
        if(pass == 'undefined'){
            alert("Debe introducir una contraseña.");
            $scope.errores.pass = "Debe introducir una contraseña.";
        }else{
            if(pass.indexOf(" ") != -1){
                alert("Debe introducir una contraseña válida");
                $scope.errores.pass = "Debe introducir una contraseña válida.";
            }
        }
        /*if(usuario != undefined && pass != undefined){
            $http.post('/api/signup', $scope.form)
                .success(function(data){
                    alert(data);
                    alert("Registro realizado con éxito");
                })
                .error(function(data){
                    alert(data);
                });
        }*/
    }
}