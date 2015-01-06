/**
 * Created by Administrator on 2014/10/11.
 */

'use strict';
angular.module('ngMyApp',[
    'myApp.router',
    'ui.bootstrap',
    'service',
    'Url',
    'baseController',
    'templateController',
    'publishController',
    'registerController',
    'adminController',
    'LoginController',
    'articleController',
    'baseFilter',
    'baseDirective',
    'ipCookie',
    'angularFileUpload',
    'alert'
]).run(function($rootScope,ipCookie){
    $rootScope.token = ipCookie('token');
})
