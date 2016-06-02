	 var testImg=angular.module("appTest",["ms.alertModal"])
	.controller('testCtr',['$scope','$rootScope',function($scope,$rootScope){
		$scope.open=false;

		$scope.sss=function(){
			alert("ss");
		}
		$scope.k=function(){
			$scope.open=true;
			$rootScope.alertModal=true;
			$rootScope.sd="sssss顶顶顶";
			$rootScope.msAlertModalConfig.isOpen=true;
		}
		$scope.d=function(){
			alert("ddd");
		}

		$rootScope.sd="sssss";

		$rootScope.msAlertModalConfig={
			sureText:'确定',
			titleText:'sure',
			contentText:'哈哈哈'
		}

		$scope.k1=function(){
			$rootScope.alertModal=true;
			$rootScope.msAlertModalConfig={
				sureText:'确定',
				titleText:'sure',
				contentText:'哈ssss哈哈',
				isOpen:true
			}			
		}

	}]);

	angular.module("ms.alertModal",["template/modal/alertmodelTemplate.html"])
	.constant('msAlertModalConstant',{
		sureText:'Sure',
		backgroundConfig:true,
		sizeConfig:'sm'

	})
	.directive('msAlertModal',['$rootScope','msAlertModalConstant',function($rootScope,msAlertModalConstant){
		return {
			restrict:'EA',
			transclude: true,
            replace: false,
			templateUrl:'template/modal/alertmodelTemplate.html',
			scope:{
			},
			link:function(scope,element,attrs,modalController){
				
				scope.getText=function(key){
					//return scope[key+'Text']||msAlertModalConfig[key+'Text'];
					return $rootScope.msAlertModalConfig[key+'Text']||msAlertModalConstant[key+'Text'];
				}

				scope.setConfig=function(key){
					return $rootScope.msAlertModalConfig[key+'Config']||msAlertModalConstant[key+'Config'];
				}

				var _modalId = attrs.id ? attrs.id : "_modal" + (Date.now());
				scope.modalid=_modalId;
				scope.close=function(type){
					if(type=='background' && scope.withback=="false"){
						return false;
					}
					$rootScope.msAlertModalConfig.isOpen=false;
				}
			}
		}
	}]);



    angular.module("template/modal/alertmodelTemplate.html", []).run(["$templateCache", function($templateCache) {
      $templateCache.put("template/modal/alertmodelTemplate.html",
'<div id="{{modalid}}" ng-class="{modal:true,fade:true,in:true }" tabindex="-1" role="dialog" aria-labelledby="{{modalid}}" style="padding-right: 17px;display: block;" ng-show="$root.msAlertModalConfig.isOpen" >'+
'    <div ng-class="{\'modal-dialog\':true,\'modal-sm\':(setConfig(\'size\')==\'sm\'),\'modal-lg\':(setConfig(\'size\')==\'lg\')}" role="document">'+
'      <div class="modal-content">'+
'        <div class="modal-header">'+
'          <button type="button" class="close" data-dismiss="modal" aria-label="Close" ng-click="close()";><span aria-hidden="true">×</span></button>'+
'          <h4 class="modal-title" id="{{modalid}}Labal">{{getText(\'title\')}}</h4>'+
'        </div>'+
'        <div class="modal-body">{{getText(\'content\')}}</div>'+
'        <div class="modal-footer" style="text-align: center;">'+
'          <button type="button" class="btn btn-primary" ng-click="close()">{{getText(\'sure\')}}</button>'+
'        </div>'+
'      </div>'+
'    </div>'+
'  </div>'+
'<div ng-class="{\'modal-backdrop\':true,fade:true,in:true}" ng-show="(setConfig(\'background\') && $root.msAlertModalConfig.isOpen)" ></div>		'+			
        "");
    }]);




