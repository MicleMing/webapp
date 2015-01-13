/**
 * Created by Administrator on 2015/1/7.
 */
angular.module('chatController',[])
    .controller('chatCtrl',function($scope,$rootScope,$timeout){
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
            console.log($rootScope.access_token);
            if(data.callname == $rootScope.access_token){
                vm.news = true;
                $timeout(function(){
                    vm.news = false
                },5000);
            }
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
            socket.emit('sendchat',{
                message:vm.message,
                callname:vm.callname
            });
            vm.message = "";
            vm.callname="";
        };
        vm.callSomeone = function(name){
            vm.message = '@'+name;
            vm.callname = name;
        }
    });