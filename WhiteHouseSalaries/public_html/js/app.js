/*
 * 
 * Simple App that uses JQuery's ajax to get White House employee salaries
 * Uses AngularJS 1.x verions
 */
var myapp = angular.module('whiteHouseApp',[]);

myapp.controller('appController',function($scope){
    $scope.log = new Array();
    //initial angular function to execute on page load
    $scope.init = function(){
        var _url = 'https://open.whitehouse.gov/api/views/ajab-5bsi/rows.json?accessType=DOWNLOAD';
        var dataHolder = new Array();
        //get json data from url and put into a temporary array
        $.ajax({
            dataType: "json",
            url: _url,
            async:false,
            crossDomain:true,
            success: function(data){
                for(var i = 0; i < data.data.length; i++){
                    dataHolder.push({
                        NAME:data.data[i][8],
                        STATUS: data.data[i][9],
                        SALARY:parseInt(data.data[i][10]),
                        PAY_FREQUENCY:data.data[i][11],
                        POSITION:data.data[i][12]
                    });
                }
            },
            error:function(e){
                console.log(e);
            }
        });
        $scope.sort(dataHolder);
        $scope.log = dataHolder;
    }
    /*
     * function to sort the array based on salary
     * @params array - the array passed into the function
     */
    $scope.sort = function(array){
        
        array.sort(function(a,b){
            return(a.SALARY > b.SALARY) ? 1 : ((b.SALARY > a.SALARY) ? -1 : 0);
        });
    }
    
    $scope.init();
    
});


