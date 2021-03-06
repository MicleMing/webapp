/**
 * Created by Administrator on 2014/11/2.
 */
var mongodb = require("./db"),
    BSON = require('mongodb').BSONPure;


function User(user){
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
}

module.exports = User;

//存储用户信息
User.prototype.save = function(callback){
    //存入的用户信息
    var user = {
        name:this.name,
        password:this.password,
        email:this.email
    }

    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        //将数据插入集合
        db.collection('users',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.insert(user,{safe:true},function(err,user){

                mongodb.close();
                if(err){
                    console.log(err);
                    return callback(err);
                }
                console.log(user);
                callback(null,user);
            })
        })
    })
};

//读取用户信息
User.get = function(name,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err)
        }
        //读取集合
        db.collection('users',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.findOne({name:name},function(err,user){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,user);
            })
        })
    })
};

//用户登陆
User.login = function(user,callback){
    mongodb.open(function(err,db){
        if(err){
            callback(err);
        }
        db.collection('users',function(err,collection){
            if(err){
                mongodb.close();
                callback(err);
            }
            collection.findOne({name:user.username,password:user.password},function(err,doc){
                mongodb.close();
                if(err){
                    callback(err);
                }
                console.log('login:',doc);
                callback(null,doc);
            })
        })
    })
};

//修改信息
User.modify =function(modify,callback){
    mongodb.open(function(err,db){
        if(err){
            mongodb.close()
            return callback(err);
        };
        db.collection('users',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            };
            if(modify.password){//包含修改密码
                collection.findAndModify({_id:BSON.ObjectID.createFromHexString(modify._id)},[['_id',1]],{
                    $set:{name:modify.username,email:modify.email,password:modify.password}
                },{new:true},function(err,doc){
                    mongodb.close()
                    if(err){
                        return callback(err);
                    }
                    return callback(null,doc);
                })
            }else{//不修改密码
                collection.findAndModify({_id:BSON.ObjectID.createFromHexString(modify._id)},[['_id',1]],{
                    $set:{name:modify.username,email:modify.email}
                },function(err,doc){
                    mongodb.close();
                    if(err){
                        return callback(err);
                    }
                    return callback(null,doc);
                })
            }

        })
    })
}


