var login = angular.module('login', []);

function mainController($scope, $http) {
    $scope.loguedUser = {};
    $scope.usuarioEstaLogueado = false;

    /*
    $http.get('/api/user')
        .success(function(data){
            $scope.usuarioEstaLogueado = true;
            $scope.loguedUser = data;
        })
        .error(function(data){
            if(data == "not-loguedin-user"){
                $scope.usuarioEstaLogueado = false;
            }
        });*/


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
    }

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
                        alert("Login correcto");
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

    /*
    $http.get('/api/userCookies')
        .success(function(data){
            $scope.form.user = data.user;
            // El input de la contrasena es simbolico si estan los datos en las cookies.
            $scope.form.pass = data.user;
            alert(data);
        })
        .error(function(data){
            alert(data);
        });
    */

}