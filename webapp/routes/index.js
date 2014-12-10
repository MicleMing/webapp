
var crypto = require('crypto'),
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
    User.get(newUser.name,function(err,user){
      if(err){
        res.status(400).send('Bad Request,an err occurred in dataBase');
      };
      if(user){
        res.status(400).send('Bad Request , this username has been risgered')
      }
    })
    newUser.save(function(err,user){
      req.session.user=user;
    })
  })

}