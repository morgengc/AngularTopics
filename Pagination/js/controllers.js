var pageControllers = angular.module('pageControllers', []);

/**
 * 注册父控制器indexController，这里由于需要将模板里的子控制器的值传递给父控制器，
 * 所以需要这个根域$rootScope来帮忙，在返回函数里需要传入这个根域对象。
 * 而且，本例是基于对url的操作来实现翻页，所以这个内建的$location服务是一定要传入的
 */
pageControllers.controller('indexController', 
function ($rootScope, $scope, $location) {
    /**
     * 给父scope定义函数，构造前面一页的URL
     * @param 无
     * @returns void
     */
    $scope.previous = function () {
        // 从浏览器的地址栏获取路径，即turnPage.html#/1中井号后面的内容：" /1 "
        // 然后通过JavaScript的silce函数取出斜杠后面的字符，并转换成数字。
        // 加 1 还是减 1 要看是在定义的是哪个按钮的功能函数了
        var pageNum = parseInt($location.path().slice(1)) - 1;
        if (pageNum < 1) {
            alert('This is the first page');
        } else {
            // 如果现在没有处在第一页，则path属性减去1，即向前翻一页。这个翻页的效果就是通过设置url中的path来实现
            $location.path(pageNum);
        }
    };

    /**
     * 构造后面一页的URL
     * @param 无
     * @returns void
     */
    $scope.next = function () {
        var pageNum = parseInt($location.path().slice(1)) + 1;
        if (pageNum > $rootScope.allPage) {
            alert('This is the last page');
        } else {
            $location.path(pageNum);
        }
    };

    /**
     * 直接跳转到指定页码
     * @param 无
     * @returns void
     */
    $scope.goToPage = function () {
        // 从input输入框绑定的currentPage变量中获取用户输入的值
        var pageNum = $scope.currentPage;
        // 为了程序的严密和可用性，需要先判断输入是否为空
        if (pageNum == null || pageNum == undefined || pageNum == "") {
            alert("try to input a page number");
        } else if (!(pageNum >= 1 && pageNum <= $rootScope.allPage)) {
            alert("The page number is beyond the scope of the number of the students")
        } else {
            $location.path(pageNum);
        }
    };

});

/**
 * 这里是在注册嵌入到首页的模板页的控制器。
 * 由于子域和父域的通信需要借助根域，所以在依赖中传入$rootScope对象
 * $scope是模板自己的作用域，它继承了父控制器indexController生成的作用域
 * 在模板中需要与服务端的文件进行交互，所以需要引入内建的$http服务。为了控制实例的复杂度，我直接写了一个json文件，做了一些假数据。
 * 这里$routeParams是一个对象，这个对象里有一个属性，就是那个id变量(/:id)，地址栏里的path是几，这个id就是几。id的值需要通过$routeParams这个对象来取得。
 */
pageControllers.controller('StudentController', ['$rootScope', '$scope', '$http', '$routeParams', 
function ($rootScope, $scope, $http, $routeParams) {
    /**
     * $http的get方法与远程的一个文件发出请求
     * 如果成功，则执行一个回调函数，函数的参数就是从远端文件里拿到的数据，这个数据可以是个数组，也可以是个对象
     * 我们这次拿到的是一个json数组，数组的元素是一个个的对象
     * @param 无
     * @returns void
     */
    $http.get('data/students.json').success(function (data) {
        // 把数组里的一个元素取出来，赋给模板子作用域对象的属性上。由于json数组的id是从1开始写的，而返回的数据是个数组，下标从0开始，所以要减去1
        $scope.student = data[$routeParams.id - 1];

        // 这里顺便把这个数组的元素个数取出来，每个元素就代表以页。那么元素总个数就代表共有多少页。
        // 注意要传递给最高级别的根域对象，因为子域能覆写父域的同名属性；子域如果没有直接赋值，那么子域的同名属性将继承父域同名属性的值；
        // 我们在回到本文件代码上面的"共 {{allPage}} 页"处，这个就是根域$rootScope的属性。而且在父控制器中并没有特别的赋值。
        // 而这个span元素恰好就在父控制器的作用域内，那么这个元素里的allPage属性就会继承父作用域的同名属性allPage的值，也就间接的显示出了总页数。
        $rootScope.allPage = data.length;
    });
}]);

