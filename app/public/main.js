//public/main.js

var angularUser = angular.module('angularUser', []);

function mainController($scope, $http) {
	$scope.user = {};

	// Cuando se cargue la página, pide del API todos los Users
	/*$http.get('/api/users')
		.success(function(data) {
			$scope.users = data;
			console.log(data)
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});*/

	// Cuando se añade un nuevo User, manda los atributos a la API
	$scope.createUser = function(){
        window.alert("Paso x el main");
		$http.post('/api/users', $scope.user)
			.success(function(data) {
				$scope.user = {};
             	$scope.users = data;
				console.log(data);
				window.alert("Usuario creado correctamente.");
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};

	// Borra un User despues de checkearlo como acabado
	$scope.deleteUser = function(id) {
		$http.delete('/api/users/' + id)
			.success(function(data) {
				$scope.users = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
	};
}
