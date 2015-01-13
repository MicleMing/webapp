/**
 * Created by Administrator on 2014/10/23.
 */

angular.module("publishController",[])
    .controller("publishCtrl",function($rootScope,$scope,$location,ipCookie,user,FileUploader,baseUrl){
        var author = ipCookie('access_token');
        var vm = $scope.vm = {
            article:{
                author:author,
                pictures:[]
            }
        }
        $scope.uploader = new FileUploader({
            url:baseUrl.base+'/article/post/picture',
            onCompleteItem:function(item, response, status, headers){
                //var pictureId = item._file.lastModified+item._file.name;
                var pictureId = item._file.name;
                vm.article.pictures.push(pictureId);
            }
        });
        vm.publish = function(){
            vm.article.title = vm.article.title.replace(/" "/g,"")
            var promise = user.publishArticle(vm.article).$promise;
            promise.then(function(data){
                console.log(data);
                $scope.$emit('success',{
                    title:'成功',
                    message:'文章发布成功'
                });
                $location.path('/article');
            },function(err){
                console.log(err);
                $scope.$emit('error',{
                    title:'失败',
                    message:'文章发布失败'
                })
            })
        };

    })
