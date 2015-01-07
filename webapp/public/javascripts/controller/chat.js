/**
 * Created by Administrator on 2015/1/7.
 */
angular.module('chatController',[])
    .controller('chatCtrl',function($scope,$rootScope,ipCookie){
        //console.log($rootScope.token+'  '+$rootScope.access_token)
        var vm = $scope.vm = {

        };
        var socket = io.connect('http://localhost:3000');
        socket.on('connect',function(){
            socket.emit('addme',$rootScope.access_token);
        });
        socket.on('chat',function(data){
            var p = document.createElement('p');
            p.innerHTML = data.username+':'+data.message;
            document.getElementById('output').appendChild(p);
        });

        vm.sendMessage = function(){
            socket.emit('sendchat',vm.message);
        }
    });