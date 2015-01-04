/**
 * Created by Administrator on 2014/10/23.
 */

angular.module("publishController",[])
    .controller("publishCtrl",function($scope,ipCookie,user){
        var author = ipCookie('access_token');
        var vm = $scope.vm = {
            article:{
                author:author
            }
        }
        vm.publish = function(){
            var promise = user.publishArticle(vm.article).$promise;
            promise.then(function(data){
                console.log(data);
                $scope.$emit('success',{
                    title:'成功',
                    message:'文章发布成功'
                })
            },function(err){
                console.log(err);
                $scope.$emit('error',{
                    title:'失败',
                    message:'文章发布失败'
                })
            })
        }
    })
