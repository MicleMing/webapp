/**
 * Created by Administrator on 2015/1/15.
 */
angular.module('detailController',[])
    .controller('detailCtrl',function($scope,$modalInstance,item){
        var vm = $scope.vm = {}
        vm.article = item;
        vm.close = function(){
            $modalInstance.close();
        };
    })