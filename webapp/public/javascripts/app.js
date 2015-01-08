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
    'chatController',
    'searchController',
    'userCenterController',
    'baseFilter',
    'baseDirective',
    'ipCookie',
    'angularFileUpload',
    'alert'
]).run(function($rootScope,ipCookie){
    $rootScope.token = ipCookie('token');
    $rootScope.access_token = ipCookie('access_token');
    $rootScope.userId = ipCookie('userId');
    $rootScope.email = ipCookie('email');
})
