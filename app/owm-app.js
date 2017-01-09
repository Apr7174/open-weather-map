angular.module('OWMApp', ['ngRoute'])
	.value('owmCities', ['New York', 'Dallas', 'Chicago'])


    .config(['$routeProvider', function($routeProvider, $loactionProvider) {
        $routeProvider.when('/', {
            templateUrl : 'home.html',
            controller : 'HomeCtrl',
            controllerAs: 'vm'
        }).when('/cities/:city', {
            templateUrl : 'city.html',
            controller : 'CityCtrl',
            controllerAs: 'vm',
//            preloads the city to load before
            resolve : {
                city: function(owmCities, $route, $location) {
                    var city = $route.current.params.city;
                    if (owmCities.indexOf(city) === -1) {
                        $location.path('/error');
                        return;
                    }
                    return city;
                }
            }
        }).when('/error', {
            template: '<p>Error - City Not in List</p>'
        }).otherwise('/error');
    }])
    .run(function($rootScope, $location, $timeout) {
        $rootScope.$on('$routeChangeError', function() {
            $location.path('/error');
        });
        $rootScope.$on('$routeChangeStart', function() {
            $rootScope.isLoading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function() {
            $timeout(function() {
                $rootScope.isLoading = false;
            }, 1000);
        });
    })
    .controller('HomeCtrl', [function() {
        //empty for now
    }])
	.controller('CityCtrl', ['$routeParams', function($routeParams) {
	    var vm = this;
	    vm.city = $routeParams.city;
	}]);