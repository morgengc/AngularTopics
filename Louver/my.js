	var testImg=angular.module("appTest",["ms.leafMenu"])
	.controller('testCtr',['$scope',function($scope){
		$scope.data=[{"id":"1","pid":"0","name":"第一行","children":[{"id":"3","pid":"1","name":"第一行1.1"},{"id":"4","pid":"1","name":"第一行1.2"}]},{"id":"2","pid":"0","name":"第二行","children":[{"id":"5","pid":"2","name":"第二行2.1"}]}];	
	}]);
	
	
	
	angular.module("ms.leafMenu",[])
	.directive('msLeafMenu',['$compile',function($compile){
		return {
			restrict:'EA',
			transclude: true,
            replace: false,
			//template:"<li></li>",
			scope:{
				data:'=?',
				id:'@?',
				pid:'@?',
				pvalue:'@?',
				showname:'@?',
				isstandard:'@?'
			},
			link:function(scope,element,attrs,leafController){
				

				function createTreeData(id,pid,pvalue){
					var newData=[];
					angular.forEach(scope.data,function(item,index){
						if(item[pid]==pvalue){
							var children=createTreeData(id,pid,item[id]);
							if(children && children.length>0){
								item.children=children;
							}
							newData.push(item);
						}
					});
					return newData;
				}
				if(!scope.isstandard){
					scope.data=createTreeData(scope.id,scope.pid,scope.pvalue);	
				}
				
				element.append($compile('<ul class="ms_leaf_menu_group"><li ng-repeat="row in data" ng-class="{ms_parent_item:(row.children && row.children.length>0),ms_child_item:(!row.children || row.children.length<=0)}"><div ng-click="toogle($index)"><a >{{row[showname]}}</a><span class="glyphicon" ng-class="{\'glyphicon-chevron-right\':(row.children && row.children.length>0 && !row.isopen),\'glyphicon-chevron-down\':(row.children && row.children.length>0 &&  row.isopen)}"  aria-hidden="true"></span></div><div ng-show="row.isopen"><ms-leaf-menu data="row.children" id="id" pid="pid" showname="{{showname}}" pvalue="{{row[id]}}"></ms-leaf-menu></div></li></ul>')(scope));

				scope.toogle=function(index){
					scope.data[index]["isopen"]=!scope.data[index]["isopen"];
				}

			}
		}
	}]);
