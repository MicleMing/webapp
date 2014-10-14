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
                elem.hide();
                $(window).scroll(function(){
                    if($(window).scrollTop()>200){
                        elem.fadeIn(1000);
                    }else{
                        elem.fadeOut(1000)
                    }
                })
                elem.bind('click',function(){
                    $('html,body').animate({scrollTop:0},500);
                    return false;
                })
            }
        }
    })
