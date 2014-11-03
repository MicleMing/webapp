/**
 * Created by Administrator on 2014/11/2.
 */
angular.module("registerController",["Url"])
    .controller("registerCtrl",['$scope','$http','baseUrl','user',function($scope,$http,baseUrl,user){
        var vm = $scope.vm ={
            user:{}
        };
        vm.registerUser = function(register_form){
            var promise = user.register(vm.user).$promise;
            promise.then(function(data){
                console.log(data);
            },function(err){
                console.log(err);
            })
        }
    }])