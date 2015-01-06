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
                });

                scope.setMain = function(item){
                    console.log(item)
                }
            }
        }
    }])
    .directive('selectCascade',['$http',function($http){
        "use strict";
        return{
            restrict:"E",
            scope:{
                source:"@source"
            },
            replace:true,
            templateUrl:'views/directiveTemplate/selectCascade.html',
            link:function(scope,elem,attr){
                var vm = scope.vm = {};
                $http.get(scope.source).success(function(result){
                    vm.result = result.data;
                });
                scope.$watch("vm.first",function(first){
                    vm.province =null;
                });
                scope.$watch("vm.province",function(province){
                    vm.city = null;
                })
            }
        }
    }])
    .directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }]);
