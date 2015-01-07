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
    io.sockets.on('connection',function(socket){
        socket.on('addme',function(username){
            socket.username = username;
            socket.emit('chat',{
                username:username,
                message:'连接成功'
            });
            socket.broadcast.emit('chat',{
                username:'SERVER',
                message:username+'上线啦'
            });
        });
        socket.on('sendchat',function(data){
            console.log('sendchat');
            io.sockets.emit('chat',{
                username:socket.username,
                message:data
            });
        });
        socket.on('disconnect',function(){
            io.sockets.emit('chat',{
                username:'SERVER',
                message:socket.username+'下线了.'
            });
        })
    });
    io.sockets.on('connecting',function(){
        console.log('connecting...')
    })

}
