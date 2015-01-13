/**
 * Created by Administrator on 2014/11/2.
 */
angular.module("registerController",["Url"])
    .controller("registerCtrl",function($scope,$http,$location,baseUrl,user,AuthService){
        var vm = $scope.vm ={
            user:{},
            flag:false
        };
        vm.registerUser = function(register_form){
            if(vm.user.password !=vm.user.psdcheck){
                vm.flag=true;
                return;
            }
            var promise = user.register(vm.user).$promise;
            promise.then(function(data){
                AuthService.setToken(data.token_type,data.access_token,data.userId,data.email);
                $scope.$emit('success',{
                    title:'成功',
                    message:'注册成功'
                })
                $location.path('/');
            },function(err){
                $scope.$emit('error',{
                    tilte:'失败',
                    message:'注册失败'
                })
            })
        }

    })