/**
 * Created by Administrator on 2015/1/8.
 */
angular.module('userCenterController',[])
    .controller('userCenterCtrl',function($scope,$rootScope){
        var vm = $scope.vm = {
            isEdit:false,
            isError:false,
            username:$rootScope.access_token,
            email:$rootScope.email,
            password:'',
            checkPsd:''
        };
        vm.edit = function(){
            vm.isEdit = true;
        }
        vm.change = function(){
            if(vm.password != vm.checkPsd){
                vm.isError = true
                return;
            };

        }
    })