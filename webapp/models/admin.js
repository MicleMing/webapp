/**
 * Created by Administrator on 2014/12/13.
 */
var mongodb = require('./db'),
    BSON = require('mongodb').BSONPure;

var Admin = function(){};
module.exports = Admin;

//管理员登陆
Admin.login = function(admin,callback){
    mongodb.open(function(err,db){
        if(err){
            mongodb.close();
            return callback(err);
        }
        db.collection('admins',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.findOne({name:admin.username,password:admin.password},{fields:{password:0}},function(err,doc){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                return callback(null,doc);
            })
        })
    })
}

//读取所有用户数据
Admin.getAll = function(callback){
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
Admin.deleted = function(id,callback){
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
                mongodb.close();
                if(err){
                    callback(err);
                }
                callback(null,doc);
            })
        })
    })
}

//删除文章
Admin.deleteArticle = function(id,callback){
    mongodb.open(function(err,db){
        if(err){
            mongodb.close();
            return callback(err);
        };
        db.collection('posts',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            };
            collection.findAndRemove({_id:BSON.ObjectID.createFromHexString(id)},function(err,doc){
                mongodb.close();
                if(err){
                    callback(err);
                }
                callback(null,doc);
            })
        })
    })
}

