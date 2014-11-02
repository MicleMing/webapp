/**
 * Created by Administrator on 2014/10/14.
 */
angular.module('templateController',['initData'])
    .controller('templateCtrl',['$scope','cascading',function($scope,cascading){
        $scope.show = cascading.isShow;
        $scope.open=function(){
            console.log("aa")
        }
    }])