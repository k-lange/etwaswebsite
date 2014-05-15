var portfolio = angular.module('luisesPortfolio', ['ngRoute', 'ngSanitize']);
 
portfolio.config(function($routeProvider, $locationProvider) {

	//$locationProvider.html5Mode(true);

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
	console.log($route.current);

	$scope.page = pageContent;
	$scope.$route = $route;
});

portfolio.controller('home', function ($scope, $routeParams) {
//	console.log('home', $routeParams)
	$scope.page = pageContent;
});

/*
portfolio.controller('grafisches', function ($scope, $route, $routeParams, $location) {
	console.log('grafisches', $routeParams)
	$scope.page = pageContent;
	$scope.params = $routeParams;
});
*/

portfolio.controller('project', function ($scope, $route, $routeParams, $location) {
//	console.log($location.url())
//	console.log('project', $routeParams)
	$scope.page = pageContent;
	$scope.params = $routeParams;


	$scope.category = $location.url().split('/')[1];
	$scope.projects = pageContent[$scope.category];
	$scope.currentProject = $scope.projects[$routeParams.projectName];

});

portfolio.directive('imgLoad', function() {
	return {
		link: function(scope, element, attrs) {

			setTimeout(function(){

				attrs = JSON.parse(attrs.imgLoad);
				element[0].src = attrs.uri;

				img = new Image();
				img.src = attrs.file;

				img.onload = function() {
					element.removeClass('loading');
			     	element[0].src = attrs.file;
			 	};
			 		console.log('vadf!')

			 	element.on('resize', function(){
			 		console.log('have been resized!')
			 	})		

			},1)

		}
	};
});




