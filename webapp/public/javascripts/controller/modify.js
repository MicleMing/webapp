/**
 * Created by Administrator on 2015/1/9.
 */
angular.module('modifyController',[])
    .controller('modifyCtrl',function($scope,$modalInstance,user,delItem){
        var vm = $scope.vm = {
            item : delItem
        };

        //关闭
        vm.close = function(){
            $modalInstance.close();
        };

        //获取文章
        vm.getDetail = function(){
            var promise = user.getDetail(vm.item._id).$promise;
            promise.then(function(data){
                vm.article = data;
            },function(err){
                $scope.$emit('error',{
                    title:'失败',
                    message:'该文章不存在'
                })
            })
        };
        vm.getDetail();

        //修改
        vm.modifyArticle = function(modify){
            var promise = user.modifyArticle(modify).$promise;
            promise.then(function(data){
                $scope.$emit("success",{
                    title:'success',
                    message:'修改成功!'
                });
                $modalInstance.close();
            },function(err){
                $scope.$emit("error",{
                    title:'error',
                    message:'修改失败!'
                })
            })
        };

        //修改图片
        vm.modifyImage = function(){
            $http.post('/test').success(function(data){}.error(function(err){}))
        }

    })