var contacto = angular.module('contacto', []);

function mainController($scope, $http){

    $scope.loguedUser = {};

    // Iniciamos la variable form por si el navegador introduce algun campo sin sentido de las cookies.

    $scope.form = {};

    $scope.errores = {};
    $scope.errores.nombreVacio = "Debe introducir un nombre.";
    $scope.errores.emailVacio = "Debe introducir un email de contacto.";
    $scope.errores.mensajeVacio = "Debe introducir un mensaje.";

    $scope.errores.emailInvalido = "Debe introducir un email válido.";

    $scope.hayErrores = false;
    $scope.nombreVacio = false;

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
        });

    */

    // Llamada AJAX para cerrar sesion

    /*
    $scope.cerrarSesion = function(){
        $http.get('/api/logout')
            .success(function(data){
                if(data == "ok"){
                    alert("Ha cerrado sesión correctamente");
                    $scope.usuarioEstaLogueado = false;
                }
            })
            .error(function(data){

            });
    }*/

    /*
    $scope.cerrarSesion = function(){
        $scope.$parent.cerrarSesion();
    };
    */

    $scope.isEmailAddress = function (str) {
        var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(str);
    };

    $scope.reiniciarMensajes = function(){
        $scope.hayErrores = false;
        $scope.nombreVacio = false;
        $scope.emailVacio = false;
        $scope.mensajeVacio = false;
        $scope.emailInvalido = false;
    };

    $scope.enviarCorreo = function(){
        $scope.reiniciarMensajes();

        $scope.validarFormulario();

        if(!$scope.hayErrores){
            $scope.form.email = angular.element("#email").val();
            $http.post('/api/emails', $scope.form)
                .success(function(data){
                    alert("Su mensaje ha sido enviado correctamente.");
                    window.location.href = '/';
                })
                .error(function(data){

                })
        }

    };

    $scope.validarFormulario = function(){
        var nombre  = $scope.form.nombre;
        // Seleccionamos así el email por que si se hace mediante ng-model Angular lo deja en undefined hasta que pasa la
        // validacion. Usando ng-non-bindable se desactiva Angular para este input.
        var email   = angular.element("#email").val();
        var mensaje = $scope.form.mensaje;

        /*
        alert("Nombre: " + nombre);
        alert("Email: " + email);
        alert("Mensaje: " + mensaje);
        */

        if(nombre == undefined || nombre == ""){
            $scope.nombreVacio = true;
            $scope.hayErrores = true;
        }
        if(email == undefined || email == ""){
            $scope.emailVacio = true;
            $scope.hayErrores = true;
        }
        if(!$scope.isEmailAddress(email)){
            $scope.emailInvalido = true;
            $scope.hayErrores = true;
        }
        if(mensaje == undefined || mensaje == ""){
            $scope.mensajeVacio = true;
            $scope.hayErrores = true;
        }

    };

}