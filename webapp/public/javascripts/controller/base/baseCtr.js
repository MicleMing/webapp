
/**
 * Created by Administrator on 2014/10/11.
 */
var baseController = angular.module('baseController',[]);

baseController.controller('baseCtrl',function($scope,$modal,$location,AuthService,ipCookie){
    var vm = $scope.vm = {
        keyword:''
    };
    /**
     * 登陆模态框
     */
    vm.gotoLogin = function(){
        var modalInstance = $modal.open({
            templateUrl:'views/directiveTemplate/login.html',
            controller:'loginCtrl'
        })
    };

    /**
     * @description 退出登录
     */
    vm.signOut = function(){
        AuthService.signOut();
    };
    /**
     * @description 转跳到搜索页面
     */
    vm.gotoSearch = function(keyword){
        ipCookie('keyword',keyword)
        $location.path('/search');
    }

    /**
     * @description 转跳到文章模块
     */
    vm.gotoArticle = function(){
        $location.path('/article')
    }
})