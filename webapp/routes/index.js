
var crypto = require('crypto'),
    User = require('../models/user.js');
module.exports = function(app){
  app.get('/',function(req,res){
    res.redirect("../index.html");
  });

  //注册
  app.post('/users',function(req,res){
    //生成密码的md5值
    var md5 = crypto.createHash('md5');
    var newUser = new User({
      name:req.param("username"),
      password:req.param("password"),
      email:req.param("email")
    });

    newUser.save(function(err,user){
      req.session.user=user;
    })
  })

}