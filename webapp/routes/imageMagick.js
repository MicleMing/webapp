/**
 * Created by Administrator on 2015/1/14.
 */

var spawn = require('child_process').spawn;
var photo = './public/images/4.jpg';
var opts = [
    photo,
    '-resize',
    '150',
    photo+'.png'
]

module.exports = function(app){
/*    app.get('/test',function(req,res){
        //console.log(process.argv);
        var im = spawn('cmd',['/c','convert\n',photo,'-resize','150',photo +'.png']);
        //var im = spawn('convert',opts);
        im.stderr.on('data',function(data){
            console.log("stderr:",data.toString('utf8'));
        });
        im.on('exit',function(code){
            if(code ==0){
                console.log('success');
            }
        })
    })*/
    app.get('/test',function(req,res){
        var cmd = require('child_process').spawn('cmd',['/c','dir\n']);
        cmd.stdout.on('data',function(data){
            console.log('stdout:',data.toString('utf8'));
        })
        cmd.stderr.on('data',function(data){
            console.log('stderr:',data.toString('utf8'));
        });
        cmd.on('exit',function(code){
            console.log(code);
        })
    })
}

/*var gm = require('gm'),
    fs = require('fs'),
    imageMagick = gm.subClass({ imageMagick: true });

module.exports = function(app){
    app.get('/test',function(req,res){
        imageMagick('./public/images/4.jpg')
            .resize(150,150,'!')
            .autoOrient()
            .write('./public/images/test/4.jpg',function(err){
                if(err){
                    console.log(err)
                }
            })

    })
}*/
