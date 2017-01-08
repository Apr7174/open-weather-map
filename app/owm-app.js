angular.module('OWMApp', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl : 'home.html',
            controller : 'HomeCtrl',
            controllerAs: 'vm'
        }).when('/city', {
            templateUrl : 'city.html',
            controller : 'CityCtrl',
            controllerAs: 'vm'
        });
    }])
    .controller('HomeCtrl', [function() {
        //empty for now
    }])
	.controller('CityCtrl', [function() {
	    var vm = this;
	    vm.city = $routeParams.city;
	}]);