var zh_CN={
		"name":"姓名",
		"age":"年龄"
	}

		var japan={
		"name":"氏名",
		"age":"年齢"
	}
var testApp=angular.module("appTest",["pascalprecht.translate"])
	 .config(['$translateProvider',function($translateProvider){
	 	  /*$translateProvider.translations('en', translationsEN);
		  $translateProvider.translations('de', translationsDE);
		  $translateProvider.preferredLanguage('en');
		  $translateProvider.fallbackLanguage('en');*/

		  $translateProvider.translations('zh_CN', zh_CN);
		  $translateProvider.translations('japan', japan);
		  $translateProvider.preferredLanguage('zh_CN');
		  $translateProvider.fallbackLanguage('zh_CN');
	 }])
	 .controller('testCtr',['$scope','$translate',function($scope,$translate){
			 $scope.changeLanguage = function (langKey) {
			    $translate.use(langKey);
			  };
	 }]);