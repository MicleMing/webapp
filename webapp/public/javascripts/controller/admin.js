/**
 * Created by ming on 2014/12/11.
 */
angular.module("adminController",["Url"])
    .controller("adminCtrl",['$scope','$http','baseUrl','user',function($scope,$http,baseUrl,user){

        var vm = $scope.vm = {
            users:{}
        }
        /**
         * 获取所有用户
         */
        vm.getAllUsers = function () {
            var promise = user.getAllUsers().$promise;
            promise.then(function(data){
                vm.users = data;
            },function(err){
                console.log(err);
            })
        };
        /**
         * 删除用户
         */
        vm.removeUser = function(userObj){
            var promise = user.deleteUser(userObj._id).$promise;
            promise.then(function(data){
                console.log(data);
            },function(err){
                console.log(err);
            })
        }
    }])
