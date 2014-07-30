var buscar = angular.module('buscar', []);

function mainController($scope, $http) {
    $scope.caramelos = {};
    $scope.loguedUser = {};

    $scope.seccionSeleccionada = "Toda la web";
    $scope.criterioSeleccionado = "Nombre";
    $scope.categoriaSeleccionada = "---";
    $scope.nombreIntroducido = "";

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

    $scope.actualizarSeccion = function(){
        var select = angular.element("#selectSeccionABuscar option:selected");
        $scope.seccionSeleccionada = select.text();
    };

    $scope.actualizarCriterio = function(){
        var select = angular.element("#selectCriterioDeBusqueda option:selected");
        /*alert("Criterio seleccionado: " + criterio.val());
        alert("Criterio seleccionado: " + criterio.text());*/
        var criterio = select.text();
        if(criterio == "Nombre"){
            $scope.categoriaSeleccionada = "---";
        }else if(criterio == "Categoría"){
            $scope.categoriaSeleccionada = "Toffees y Masticables";
            $scope.nombreIntroducido = "";
        }
        $scope.criterioSeleccionado = select.text();
    };

    $scope.actualizarCategoria = function(){
        var select = angular.element("#selectCategoria option:selected");
        $scope.categoriaSeleccionada = select.text();
    };

    $scope.actualizarNombre = function(){
        var input = angular.element("#inputNombre");
        //alert("Input: " + input.val());
    };

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