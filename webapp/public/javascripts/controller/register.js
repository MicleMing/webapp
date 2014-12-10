/**
 * Created by Administrator on 2014/11/2.
 */
angular.module("registerController",["Url"])
    .controller("registerCtrl",['$scope','$http','baseUrl','user',function($scope,$http,baseUrl,user){
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
                alert("success")
            },function(err){
                alert("err")
            })
        }
    }])