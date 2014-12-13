/**
 * Created by Administrator on 2014/12/9.
 */

var LoginController = angular.module('LoginController',[]);

LoginController.controller('loginCtrl',function($scope,$modalInstance,user){
        var vm = $scope.vm = {
            user:{}
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
                    console.log('login:',data);
                },function(err){
                    console.log(err);
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