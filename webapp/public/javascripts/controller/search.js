/**
 * Created by Administrator on 2015/1/8.
 */
angular.module('searchController',[])
    .controller('searchCtrl',function($scope,$http,ipCookie){
        //alert(ipCookie('keyword'))
        var vm = $scope.vm = {
            keyword:''
        };
        vm.keyword = ipCookie('keyword');

        //jsonp 回调函数
        vm.dachie = function(d) {
            if (d.s) return d.s
            else {
                return d.result.map(function(item) {
                    return item[0]
                });
            }
        };

        vm.searchByJsonp = function(){
            $http({
                method: 'JSONP',
                // url: "http://suggestion.baidu.com/sug?wd=" + vm.keyword + "&json=1&p=3&callback=JSON_CALLBACK"
                url:"http://suggest.taobao.com/sug?code=utf-8&q=" + vm.keyword + "&callback=JSON_CALLBACK"
                // url:"http://ajax.googleapis.com/ajax/services/search/web? v=1.0&q="+vm.keyword+"&callback=JSON_CALLBACK"
                //url:'http://api.douban.com/v2/book/24754123?callback=JSON_CALLBACK'
            }).success(function(data, status, headers, config) {
                vm.result = data.result;
                console.log(data);

            }).error(function(data, status, headers, config) {
            });
        }
        vm.searchByJsonp();
    })