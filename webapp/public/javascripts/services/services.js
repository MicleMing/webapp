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

        var UserOperation = $resource(baseUrl.base+'/user/:opt',
            {
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
                opt:'delete',
                id:id
            });
        }
        return service;
    }])
