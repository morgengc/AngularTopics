var turnPageApp = angular.module('turnPageApp', [
    'ngRoute',
    'pageControllers'
]);

/*
 * 设置对于不同的url，启用不同的模板和控制器。
 * 本例由于只用到了一个模板，所以遇到的路由的情况就只有一种，即 "/id"
 */
turnPageApp.config(['$routeProvider', 
function ($routeProvider) {
    $routeProvider.when('/:id', {
    templateUrl: 'view/student.html',
    controller: 'StudentController'
});

$routeProvider.otherwise({
    redirectTo: '/1'
    });
}]);

