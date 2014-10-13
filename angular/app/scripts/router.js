/**
 * Created by Administrator on 2014/10/11.
 */
angular.module('myApp.router',[
    'ngRoute'
]).config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/view1',{
        templateUrl:'views/home.html',
        controller:'baseCtr1'
        })
        .when('/view2',{
                templateUrl:'views/footer.html',
                controller:'baseCtrl'
        })
}])
