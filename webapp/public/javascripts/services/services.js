/**
 * Created by Administrator on 2014/10/13.
 */
"use strict"
angular.module("service",["ngResource","Url"])
    .service("user",["$location","$resource","$http","baseUrl",function($location,$resource,$http,baseUrl){
        var UsersResource = $resource(baseUrl.base+'/:id',
            {
                id:'@id'
            },//第三个参数，自定义$resource方法
            {
                update:{
                    method:'PUT'
                }
            }
        );

        var UserOperation = $resource(baseUrl.base+'/:role/:opt',
            {
                role:'@role',
                opt:'@opt'
            }
        );

        var ArticleOperation = $resource(baseUrl.base+'/article/:role/:opt',
            {
                role:'@role',
                opt:'@opt'
            }
        );
        var service={};

        //注册
        service.register= function(user){
            return UsersResource.save({
                id:"users"
            },user);
        }
        //查询所有用户
        service.getAllUsers = function(){
            return UsersResource.query({
                id:'allusers'
            })
        }

        //删除用户
        service.deleteUser = function(id){
            return UserOperation.delete({
                role:'user',
                opt:'delete',
                id:id
            });
        }
        //用户登陆
        service.userLogin = function(user){
            return UserOperation.save({
                role:'user',
                opt:'login'
            },user);
        }
        //管理员登陆
        service.adminLogin = function(user){
            return UserOperation.save({
                role:'admin',
                opt:'login'
            },user);
        };

        //发布文章
        service.publishArticle =function(article){
            return ArticleOperation.save({
                opt:'post'
            },article);
        };

        //获取文章列表
        service.getArticleList = function(query){
            return ArticleOperation.query({
                opt:'list',
                query:query
            })
        };

        //根据id获取文章内容
        service.getDetail = function(id){
            return ArticleOperation.get({
                opt:'detail',
                id:id
            })
        };

        //根据id 删除文章
        service.deleteArticle = function(id){
            return ArticleOperation.delete({
                role:'admin',
                opt:'delete',
                id:id
            })
        };

        //修改个人信息
        service.modify = function(modify){
            return UserOperation.save({
                role:'user',
                opt:'modify'
            },modify)
        };

        //修改文章信息
        service.modifyArticle = function(modify){
            return ArticleOperation.save({
                opt:'modify'
            },modify)
        }

        return service;
    }])
    .service('AuthService',function AuthService($rootScope,$http,ipCookie,baseUrl){

        var authService = {};

        authService.user = {};
        authService.inited = false;

        //登陆
        authService.signIn = function(credentials){
            credentials.grant_type = 'password';
            var authorization  = 'Basic MzUzYjMwMmM0NDU3NGY1NjUwNDU2ODdlNTM0Z';

            $http.defaults.headers.common.AutoAuthorize = authorization;
            $http.post(baseUrl.base+'/'+credentials.role+'/login',credentials
            ).success(function(data){
                if(data.token_type && data.access_token){
                    authService.setToken(data.token_type,data.access_token,data.userId,data.email);
                };
                    $rootScope.$emit('success',{
                        title:'成功',
                        message:'登录成功'
                    })
            }).error(function(err){
                    $rootScope.$emit('error',{
                        title:'失败',
                        message:'登录失败'
                    })
            })
        };

        //退出登录
        authService.signOut = function(){
            ipCookie.remove('token')
            ipCookie.remove('access_token');
            $rootScope.token = null;
            $rootScope.access_token = null;
        };
        //设置token
        authService.setToken = function(token,access_token,userId,email){
            $rootScope.token = token;
            $rootScope.access_token = access_token;
            $rootScope.userId = userId;
            $rootScope.email = email;
            ipCookie('token',token);
            ipCookie('access_token',access_token);
            ipCookie('userId',userId);
            ipCookie('email',email);
            //var a = ipCookie('token'),
            //    b = ipCookie('access_token');
        };

        return authService;
    })
