var buscar = angular.module('buscar', []);

function mainController($scope, $http) {
    $scope.caramelos = {};
    $scope.loguedUser = {};

    $scope.seccionSeleccionada = {name:'Toda la web'};
    $scope.criterioSeleccionado = {name: 'Nombre'};
    $scope.categoriaSeleccionada = {name: '---'};
    $scope.nombreIntroducido = {name: ''};

    $scope.sections = [
        {name: 'Toda la web'},
        {name: 'Gama propia'},
        {name: 'Publicitarios'}
    ];

    $scope.criterias = [
        {name: 'Nombre'},
        {name: 'Categoría'}
    ];

    $scope.categorias = [
        {name: 'Toffees y Masticables'},
        {name: 'Duros'},
        {name: 'Grageados'},
        {name: 'Con palo'}
    ];

    $scope.actualizarCriterio = function(){
        var select = angular.element("#selectCriterioDeBusqueda option:selected");
        var criterio = select.text();
        if(criterio == "Nombre"){

        }else if(criterio == "Categoría"){
            $scope.nombreIntroducido.name = "";
        }
    };

    /*
    $scope.actualizarNombre = function(){
        var input = angular.element("#inputNombre");
        //alert("Input: " + input.val());
    };*/

    // Cuando se cargue la página, pide del API todas las excursiones
    $http.get('/api/conPalo')
        .success(function(data) {
            if(data.message){
                $scope.conPalos = {};
            }else{
                $scope.conPalos = data;
            }
        })
        .error(function(data) {
            alert("No se ha podido cargar la página correctamente. Recargue la página. Gracias.");
        });

    $scope.buscar = function(){
        var seccion = angular.element("#selectSeccionABuscar");
        alert("Seccion: " + seccion.val);
    }

}