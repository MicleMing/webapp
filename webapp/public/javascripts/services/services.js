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
        )

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
        }

        return service;
    }])
