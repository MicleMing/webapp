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
        service.getArticleList = function(){
            return ArticleOperation.query({
                opt:'list'
            })
        };

        //根据id获取文章内容
        service.getDetail = function(id){
            return ArticleOperation.get({
                opt:'detail',
                id:id
            })
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
            $http.post(baseUrl.base+'/user/login',credentials
            ).success(function(data){
                if(data.token_type && data.access_token){
                    authService.setToken(data.token_type,data.access_token);
                    $rootScope.$broadcast('user.update');
                }
            }).error(function(err){
                $rootScope.$broadcast('user.error');
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
        authService.setToken = function(token,access_token){
            $rootScope.token = token;
            $rootScope.access_token = access_token;
            ipCookie('token',token);
            ipCookie('access_token',access_token);
            //var a = ipCookie('token'),
            //    b = ipCookie('access_token');
        };

        return authService;
    })
