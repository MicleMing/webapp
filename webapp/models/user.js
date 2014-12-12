/**
 * Created by Administrator on 2014/11/2.
 */
var mongodb = require("./mongodb");

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

//读取所有用户数据
User.getAll = function(callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('users',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.find().toArray(function(err,docs){
                callback(null,docs);
                mongodb.close();
            });
        })
    })
}

//删除用户
User.deleted = function(id,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('users',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }

            collection.findAndRemove({_id:BSON.ObjectID.createFromHexString(id)},function(err,doc){
                console.log("obj",id);
                mongodb.close();
                if(err){
                    callback(err);
                }
                callback(null,doc);
            })
        })
    })
}
