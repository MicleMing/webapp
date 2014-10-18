/**
 * Created by Administrator on 2014/10/11.
 */
var baseDirective = angular.module('baseDirective',[]);
baseDirective
    .directive('backToTop',function(){
        return{
            restrict:'AE',
            templateUrl:'views/directiveTemplate/backToTop.html',
            link:function(scope,elem,attr){
                var firstLink = $(elem.children()[0]).children('a.toTop');
                firstLink.hide();
                console.log()
                $(window).scroll(function(){
                    if($(window).scrollTop()>100){
                        firstLink.fadeIn(500);
                    }else{
                        firstLink.fadeOut(500)
                    }
                })
                firstLink.bind('click',function(){
                    $('html,body').animate({scrollTop:0},500);
                    return false;
                })
            }
        }
    })
    .directive('cascading',['$http','$rootScope','$timeout',function($http,$rootScope,$timeout){
        "use strict";
        return{
            restrict:'E',
            scope:{
                source:'@source'
            },
            replace:true,
            templateUrl:'views/directiveTemplate/cascading.html',
            link:function(scope,element,attr){
                //从json获取数据
                $http.get(scope.source).success(function (result) {
                    scope.main = result.data;
                })
            }
        }
    }])
