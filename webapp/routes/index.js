
/*
 * GET home page.
 */
var crypto = require('crypto'),
    User = require('../models/user.js');
module.exports = function(app){
  app.get('/',function(req,res){
    res.redirect("../index.html");
  });
  app.post('/',function(req,res){
    console.log(req,res);
  })
  //注册
  app.post('../views/register.html',function(req,res){
  })
}