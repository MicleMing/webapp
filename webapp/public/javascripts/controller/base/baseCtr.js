
/**
 * Created by Administrator on 2014/10/11.
 */
var baseController = angular.module('baseController',[]);

baseController.controller('baseCtrl',function($scope,$modal){
    var vm = $scope.vm = {

    };
    /**
     * 登陆模态框
     */
    vm.gotoLogin = function(){
        var modalInstance = $modal.open({
            templateUrl:'views/directiveTemplate/login.html',
            controller:'loginCtrl'
        })
    }
})