/**
 * Created by Administrator on 2014/10/23.
 */

angular.module("publishController",[])
    .controller("publishCtrl",["$scope",function($scope){
        $scope.submitMsg = function(base_form){
            if(base_form.$valid){
                alert("提交成功")
            }
        }
    }])
