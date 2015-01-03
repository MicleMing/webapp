/**
 * Created by Administrator on 2015/1/3.
 */
'use strict';
angular.module('alert',[])
    .directive('alertModals',function($rootScope,$timeout){
        return{
            restrict:'AE',
            scope:{
            },
            transclude:true,
            templateUrl:'views/directiveTemplate/alert.html',
            link:function(scope,elem,attrs){
                $rootScope.$on('success',function(event,data){
                    scope.header = data.title;
                    scope.message = data.message;
                    scope.status = event.name;
                    $('#alertModal').modal('show');
                    $timeout(function(){
                        $('#alertModal').modal('hide')
                    },1500);
                });
                $rootScope.$on('error',function(event,data){
                    scope.header = data.title;
                    scope.message = data.message;
                    scope.status = event.name;
                    $('#alertModal').modal('show');
                    $timeout(function(){
                        $('#alertModal').modal('hide')
                    },1500);
                })
            }
        }
    });