/**
 * Created by Administrator on 2014/12/9.
 */

var LoginController = angular.module('LoginController',[]);

LoginController.controller('loginCtrl',function($rootScope,$scope,$modalInstance,user){
        var vm = $scope.vm = {
            user:{
                role:'user'
            },
            isNotExit:false
        }
    /**
     * 关闭模态框
     */
    vm.close = function(){
        $modalInstance.close();
    }
    /**
     * 登陆
     */
        vm.login = function(){
            if(vm.user.role =='user'){
                var promise = user.userLogin(vm.user).$promise;
                promise.then(function(data){
                    vm.isNotExit = false;
                    $rootScope.isLogin = true;
                    $modalInstance.close();
                },function(err){
                    vm.isNotExit = true;
                })
            }else if(vm.user.role == 'admin'){
                var promise = user.adminLogin(vm.user).$promise;
                promise.then(function(data){
                    console.log(data);
                },function(err){
                    console.log(err);
                })
            }
        }
    })