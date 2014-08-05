var buscar = angular.module('buscar', []);

function mainController($scope, $http) {
    $scope.caramelos = {};
    $scope.loguedUser = {};

    $scope.usuarioEstaLogueado = false;

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

    $scope.seccionSeleccionada = {name:'Toda la web'};
    $scope.criterioSeleccionado = {name: 'Nombre'};
    $scope.categoriaSeleccionada = {name: '---'};
    $scope.nombreIntroducido = {name: ''};


    // Variables con los resultados de la busqueda

    $scope.toffees = {};
    $scope.masticables = {};
    $scope.crystals = {};
    $scope.glorias = {};
    $scope.ponnies = {};
    $scope.sinGrupo = {};
    $scope.grageados = {};
    $scope.conPalo = {};

    // Opciones de los selects

    $scope.sections = [
        {name: '--- Elige una sección ---'},
        //{name: 'Toda la web'},
        {name: 'Gama propia'}//,
        //{name: 'Publicitarios'}
    ];

    $scope.criterias = [
        {name: '--- Elige un criterio de búsqueda ---'},
        {name: 'Nombre'},
        {name: 'Categoría'}
    ];

    $scope.categorias = [
        {name: '--- Elige una categoría ---'},
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

    $scope.limpiarBusquedas = function(){
        // Toffees y masticables
        $scope.toffees = {};
        $scope.masticables = {};
        // Duros
        $scope.crystals = {};
        $scope.glorias = {};
        $scope.ponnies = {};
        $scope.sinGrupo = {};

        $scope.grageados = {};

        $scope.conPalo = {};
    }

    $scope.buscar = function(){
        $scope.limpiarBusquedas();

        var json = {
            seccion: {
                texto: $scope.seccionSeleccionada.name,
                numero: angular.element("#selectSeccionABuscar :selected").val()
            },
            criterio: {
                texto: $scope.criterioSeleccionado.name,
                numero: angular.element("#selectCriterio :selected").val()
            },
            categoria: {
                texto: $scope.categoriaSeleccionada.name,
                numero: angular.element("#selectCategoria :selected").val()
            },
            nombre: {
                texto: $scope.nombreIntroducido.name
            }
        };
        $http.post('/api/buscar', json)
            .success(function(data) {
                if(data.toffees){
                    $scope.toffees      = data.toffees;
                    $scope.masticables  = data.masticables;
                }else if(data.crystals){
                    $scope.crystals = data.crystals;
                    $scope.glorias = data.glorias;
                    $scope.ponnies = data.ponnies;
                    $scope.sinGrupo = data.sinGrupo;
                }else if(data.grageados){
                    $scope.grageados    = data.grageados;
                }else if(data.conPalo){
                    $scope.conPalo      = data.conPalo;
                }
            })
            .error(function(data) {
                alert("Error en la búsqueda");
            });
    };

    $scope.esSurtido = function(caramelo){
        return caramelo.model == "Surtido";
    }

}