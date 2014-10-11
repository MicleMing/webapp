/**
 * Created by Administrator on 2014/10/11.
 */
angular.module('ngMyApp').config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'app/view/home.html',
        controller:'baseCtr1'
    })
}])
