var portfolio = angular.module('luisesPortfolio', ['ngRoute', 'ngSanitize']);
 
portfolio.config(function($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

    $routeProvider.
    when('/grafisches/:projectName', {
		templateUrl: 'src/app/views/project.tpl.html',
		controller: 'project',
    }).when('/grafisches', {
		templateUrl: 'src/app/views/project.tpl.html',
		controller: 'project',
    }).when('/kaufen/:projectName', {
		templateUrl: 'src/app/views/project.tpl.html',
		controller: 'project',
    }).when('/kaufen', {
		templateUrl: 'src/app/views/project.tpl.html',
		controller: 'project',
    }).when('/', {
		templateUrl: 'src/app/views/home.tpl.html',
		controller: 'home'
    }).otherwise({
		redirectTo: '/'
	});

});

portfolio.controller('mainPageCtrl', function ($scope, $route, $routeParams, $location) {
	$scope.location = $location;
	$scope.category = $location.url().split('/')[1];

	$scope.page = pageContent;
	$scope.$route = $route;
});

portfolio.controller('home', function ($scope, $routeParams) {
	$scope.page = pageContent;
});

portfolio.controller('project', function ($scope, $route, $routeParams, $location) {
	$scope.page = pageContent;
	$scope.params = $routeParams;


	$scope.category = $location.url().split('/')[1];
	$scope.projects = pageContent[$scope.category];
	$scope.currentProject = $scope.projects[$routeParams.projectName];

});

portfolio.directive('imgLoad', function() {
	return {
		scope: {
			url: '@imgLoad'
		},
		link: function(scope, element, attrs) {

			var img = document.createElement('img');
			img.src = scope.url;

			img.addEventListener('load', function () {
				img.removeEventListener('load', arguments.callee);
				element[0].src = scope.url;
			});
		}
	};
});




