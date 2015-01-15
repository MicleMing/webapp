
var crypto = require('crypto'),
    fs = require('fs');
    url = require('url'),
    User = require('../models/user.js'),
    Admin = require('../models/admin.js'),
    Article = require('../models/post.js');
module.exports = function(app){

  //重定向
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
      res.status(200).send({
        token_type:'user',
        access_token:user[0].name,
        userId:user[0]._id,
        email:user[0].email
      });
    })
  });

  //查询所有用户
  app.get('/allusers',function(req,res){
    Admin.getAll(function(err,users){
      res.status(200).send(users);
    })
  });

  //删除用户
  app.delete('/user/delete',function(req,res){
    var id = req.param('id');
    Admin.deleted(id,function(err,users){
      if(err){
        res.status(400).send(err);
      }
      res.status(200).send(users);
    })
  });
  //普通用户登陆
  app.post('/user/login',function(req,res){
    var md5 = crypto.createHash('md5');
    var user = {
      username:req.body.username,
      password:md5.update(req.body.password).digest('hex'),
      grant_type:req.body.grant_type
    };
    var AutoAuthorize = req.get('AutoAuthorize');
    //进行身份验证
    var serviceAutorize = 'Basic MzUzYjMwMmM0NDU3NGY1NjUwNDU2ODdlNTM0Z';

    if(AutoAuthorize === serviceAutorize && user.grant_type === 'password' ){
      User.login(user,function(err,user){
        if(err){
          res.status(400).send({
            error:'bad request'
          })
        }else{
          if(user === null){
            res.status(404).send({
              error:'not found'
            });
          }else{
              var data = {
                token_type:'user',
                access_token:user.name,
                userId:user._id,
                email:user.email
              };
              res.status(200).send(data);
            }
          }
      })
    }
  });
  //管理员登陆
  app.post('/admin/login',function(req,res){
    var admin = {
      username:req.body.username,
      password:req.body.password,
      grant_type:req.body.grant_type
    };
    var AutoAuthorize = req.get('AutoAuthorize');
    //进行身份验证
    var serviceAutorize = 'Basic MzUzYjMwMmM0NDU3NGY1NjUwNDU2ODdlNTM0Z';

    if(AutoAuthorize === serviceAutorize && admin.grant_type === 'password' ){
      Admin.login(admin,function(err,admin){
        if(err){
          res.status(400).send({
            error:'bad request'
          })
        }else{
          if(admin === null){
            res.status(404).send({
              error:'not found'
            });
          }else{
            var data = {
              token_type:'admin',
              access_token:admin.name,
              name:admin.name
            };
            res.status(200).send(data);
          }
        }
      })
    }
  })
  //上传图片
  app.post('/article/post/picture',function(req,res){
    res.status(200).send('ok');
  })
  //文章发布
  app.post('/article/post',function(req,res){
    var author = req.body.author,
        title = req.body.title,
        post = req.body.post,
        pictures = req.body.pictures;

    var newArticle = new Article(author,title,post,pictures);

    newArticle.save(function(err,doc){
      if(err){
        res.status(400).send('post error');
      }else{
        res.status(200).send(doc[0]);
      }
    })
  });

  //获取文章列表
  app.get('/article/list',function(req,res){
    var query = {},
        author = req.param('query');
    if(author){
      query.author = author;
    }
    Article.get(query,function(err,doc){
      if(err){
        res.status(400).send('bad request');
      }else{
        res.status(200).send(doc);
      }
    })
  });
  //获取查询文章（根据id）
  app.get('/article/detail',function(req,res){
    var id = req.param('id');
    var query = {
      _id:id
    }
    Article.get(query,function(err,doc){
      if(err){
        res.status(400).send('bad request');
      }else{
        res.status(200).send(doc[0]);
      }
    })
  });

  //根据关键字查询文章
  app.get('/article/listkey',function(req,res){
    var keyword  = req.param('search');
    Article.findByKeyWord(keyword,function(err,doc){
      if(err){
        res.status(400).send('bad request');
      }else{
        console.log(doc);
        res.status(200).send(doc);
      }
    })
  })

  //删除文章
  app.delete('/article/admin/delete',function(req,res){
    var id = req.param('id');
    Admin.deleteArticle(id,function(err,doc){
      if(err){
        res.status(400).send('bad request');
      }else{
        //console.log(doc);
        doc.pictures.forEach(function(item){
          fs.unlinkSync('./public/images/user/'+item);
        })
        res.status(200).send('delete success');
      }
    })
  });

  //修改个人信息
  app.post('/user/modify',function(req,res){
    var modify = {
      username:req.body.username,
      email:req.body.email,
      _id:req.body.id
    }
    if(req.body.password){
      var md5 = crypto.createHash('md5');
      modify.password = md5.update(req.body.password).digest('hex')
    };
    User.modify(modify,function(err,doc){
      if(err){
        res.status(400).send('error on server');
      }else{
        res.status(200).send(doc);
      }
    })
  });

  //修改文章
  app.post('/article/modify',function(req,res){
    var modify = {
      _id:req.body._id,
      title:req.body.title,
      post:req.body.post
    };
    Article.modify(modify,function(err,doc){
      if(err){
        res.status(400).send('bad request');
      }else{
        res.status(200).send(doc[0]);
      }
    })
  })

}