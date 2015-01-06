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
        vm.getAllUsers();
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
        /**
         * 获取文章
         */
        vm.isFirst = true;
        vm.getAticlesList = function(){
            var promise = user.getArticleList().$promise;
            promise.then(function(data){
                vm.items = data;
            },function(err){
                console.log(err);
            })
        };
       // vm.getAticlesList();
        /**
         * 搜索
         */
        vm.searchArticles = function(query){
            var promise = user.getArticleList(query).$promise;
            promise.then(function(data){
                vm.items = data;
            },function(err){
                console.log(err);
            })
        };

        /**
         * 删除文章
         */
        vm.deleteArticle = function(article){
            var promise = user.deleteArticle(article._id).$promise;
            promise.then(function(data){
                vm.items.forEach(function(item,index,array){
                    if(item._id == article._id ){
                        vm.items.splice(index,1);
                        return;
                    }
                })
                $scope.$emit('success',{
                    title:'success',
                    message:'删除成功'
                })
            },function(err){
                $scope.$emit('error',{
                    title:'error',
                    message:'删除失败'
                })
            })
        }

    }])
