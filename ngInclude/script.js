angular.module('includeExample', ['ngAnimate'])
	.controller('ExampleController', ['$scope', function($scope) {
		$scope.templates =
			[
				{ name: 'template1_html', url: 'template1.html'},
				{ name: 'template2_html', url: 'template2.html'}
			];
		$scope.template = $scope.templates[0];
	}]);

