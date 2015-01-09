/**
 * Created by Administrator on 2015/1/8.
 */
angular.module('userCenterController',[])
    .controller('userCenterCtrl',function($scope,$rootScope,$modal,$location,user,ipCookie){
        var vm = $scope.vm = {
            isEdit:false,
            isError:false,
            username:$rootScope.access_token,
            email:$rootScope.email,
            id:$rootScope.userId,
            password:'',
            checkPsd:''
        };
        vm.edit = function(){
            vm.isEdit = true;
        }
        //修改个人信息
        vm.modify = function(){
            if(vm.password != vm.checkPsd){
                vm.isError = true
                return;
            };
            var promise = user.modify({
                username:vm.username,
                email:vm.email,
                password:vm.password,
                id:vm.id
            }).$promise;
            promise.then(function(data){
                $rootScope.access_token = data.name;
                $rootScope.userId = data._id;
                $rootScope.email = data.email;
                ipCookie('access_token',data.name);
                ipCookie('userId', data._id);
                ipCookie('email',data.email);
                $scope.$emit('success',{
                    title:'success',
                    message:'修改信息成功'
                });
                vm.isEdit = false;
            },function(err){
                $scope.$emit('error',{
                    title:'error',
                    message:'修改信息失败'
                });
            })
        };

        //获取文章
        vm.searchArticles = function(){
            var promise = user.getArticleList(vm.username).$promise;
            promise.then(function(data){
                vm.items = data;
            },function(err){
                console.log(err);
            })
        }
        vm.searchArticles();

        //删除文章
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

        //修改文章
        vm.gotoModify = function(article){
            $scope.delItem = article;
            var modalInstance = $modal.open({
                templateUrl:'views/directiveTemplate/modify.html',
                controller:'modifyCtrl',
                size:'lg',
                resolve:{
                    delItem:function(){
                        return $scope.delItem
                    }
                }
            })
        };

        //生成pdf
        vm.pdfKit = function(item){
            var  promsie = user.pdfKit(item._id).$promise;
            promsie.then(function(data){

            },function(err){
                console.log(err);
            })
        }
    })