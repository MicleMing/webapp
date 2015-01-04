/**
 * Created by Administrator on 2015/1/4.
 */
'use strict';

angular.module('articleController',[])
    .controller('articleCtrl',function($scope,$location,user){
        var vm = $scope.vm = {
            items:[]
        };

        //转跳到文章发布页面
        vm.publish = function(){
            $location.path('/publish');
        }

        //获取文章列表
        vm.getAticlesList = function(){
            var promise = user.getArticleList().$promise;
            promise.then(function(data){
                vm.items = data;
            },function(err){
                console.log(err);
            })
        };

        //获取文章内容
        vm.getDetail = function(item){
            var promise = user.getDetail(item._id).$promise;
            promise.then(function(data){
                vm.article = data;
            },function(err){
                $scope.$emit('error',{
                    title:'失败',
                    message:'该文章不存在'
                })
            })
        }

    })