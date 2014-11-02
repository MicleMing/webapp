/**
 * Created by Administrator on 2014/11/2.
 */
angular.module("registerController",["Url"])
    .controller("registerCtrl",['$scope','$http','baseUrl',function($scope,$http,baseUrl){
        var vm = $scope.vm ={
            user:{}
        };
        vm.register = function(register_form){
            $http.post(baseUrl.base,vm.user,function(res){
                console.log(res)
            })
        }
    }])