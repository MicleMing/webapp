/**
 * Created by Administrator on 2015/1/7.
 */
angular.module('chatController',[])
    .controller('chatCtrl',function($scope,$rootScope,ipCookie){
        //console.log($rootScope.token+'  '+$rootScope.access_token)
        var vm = $scope.vm = {
            connect:false,
            chatList:[],
            onlineUsers:[],
            userCount:0
        };
        var socket = io.connect('http://localhost:3000');
        socket.on('connect',function(){
            vm.connect = true;
            socket.emit('addme',{
                username:$rootScope.access_token,
                userId :$rootScope.userId
            });
        });
        socket.on('chat',function(data){
            vm.chatList.push({
                username:data.username,
                message:data.message
            });
           // vm.onlineUsers = data.onlineUsers;
            if(vm.connect == true || data.connect == true){
                vm.onlineUsers = [];
                for(var i in data.onlineUsers){
                    vm.onlineUsers.push(data.onlineUsers[i]);
                }
                vm.userCount = data.userCount;
            }
            vm.connect = false;
            $scope.$apply();
        });
        socket.on('leave',function(data){
            vm.chatList.push({
                username:data.username,
                message:data.message
            });
            vm.onlineUsers = [];
            for(var i in data.onlineUsers){
                vm.onlineUsers.push(data.onlineUsers[i]);
            }
            vm.userCount = data.userCount;
            $scope.$apply();
        })

        vm.sendMessage = function(){
            socket.emit('sendchat',vm.message);
        }
    });