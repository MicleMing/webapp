
var crypto = require('crypto'),
    url = require('url'),
    User = require('../models/user.js');
module.exports = function(app){
  app.get('/',function(req,res){
    res.redirect("../index.html");
  });

  //注册
  app.post('/users',function(req,res){
    //生成密码的md5值
    var md5 = crypto.createHash('md5'),
        name = req.body.username,
        password = md5.update(req.body.password).digest('hex'),
        email = req.body.email;
    var newUser = new User({
      name:name,
      password:password,
      email:email
    });


    //检查是否存在相同的用户
    //User.get(newUser.name,function(err,user){
    //  if(err){
    //    console.log(err);
    //    res.status(400).send('Bad Request,an err occurred in dataBase');
    //  };
    //  if(user){
    //    res.status(400).send('Bad Request , this username has been risgered')
    //  }
    //})
    newUser.save(function(err,user){
      req.session.user=user;
      res.status(200).send("ok");
    })
  });

  //查询所有用户
  app.get('/allusers',function(req,res){
    User.getAll(function(err,users){
      res.status(200).send(users);
    })
  })

  //删除用户
  app.delete('/user/delete',function(req,res){
    var id = req.param('id');
    User.deleted(id,function(err,users){
      if(err){
        res.status(400).send(err);
      }
      res.status(200);
    })
  })
}