/**
 * Created by Administrator on 2014/10/11.
 */

var baseFilter = angular.module('baseFilter',[]);
baseFilter.filter('characterFilter',[function(){
    return function(input,keyword,limitNumber){
        var partern = new RegExp(keyword,'ig');
        var highlightTerm = '<span style="color:red">' + keyword + '</span>';
        if(partern.test(input)){
            var index = input.search(partern);
            var output = '......'+input.substring(index,index+limitNumber)+'......';
        }else{
            output = input.substring(0,limitNumber)+'......';
        }
        return output
    }
}])
