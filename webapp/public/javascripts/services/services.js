/**
 * Created by Administrator on 2014/10/13.
 */
"use strict"
angular.module("service",["ngResource","Url"])
    .factory("rest",["$resource",function($resource){
        return $resource(baseUrl.base,{})
    }])