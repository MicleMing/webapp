/**
 * Created by Administrator on 2015/1/7.
 */
var sio = require('socket.io'),
    http = require('http');

module.exports = function(app,server){
   // var server = http.createServer(app);
    app.get('/user/chat',function(req,res){
        console.log(req)
        res.send('hello');
    });

    var io = sio.listen(server);
    var userCount = 0,
        onlineUsers = {};
    io.sockets.on('connection',function(socket){
        socket.on('addme',function(user){
            socket.username = user.username;
            socket.userId = user.userId;
            if(!onlineUsers.hasOwnProperty(user.userId)){
                userCount++;
                onlineUsers[user.userId] = user.username
            }
            socket.emit('chat',{
                username:user.username,
                message:'连接成功',
                userCount:userCount,
                onlineUsers:onlineUsers
            });
            socket.broadcast.emit('chat',{
                username:'SERVER',
                message:user.username+'上线啦',
                userCount:userCount,
                onlineUsers:onlineUsers,
                connect:true
            });

        });
        socket.on('sendchat',function(data){
            console.log('sendchat');
            io.sockets.emit('chat',{
                username:socket.username,
                message:data,
                userCount:userCount,
                onlineUsers:onlineUsers
            });
        });
        socket.on('disconnect',function(){
            if(onlineUsers.hasOwnProperty(socket.userId)){
                userCount--;
                delete onlineUsers[socket.userId];
            }
            io.sockets.emit('leave',{
                username:'SERVER',
                message:socket.username+'下线了.',
                userCount:userCount,
                onlineUsers:onlineUsers
            });
        })
    });
    io.sockets.on('connecting',function(){
        console.log('connecting...')
    })

}
