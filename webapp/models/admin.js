/**
 * Created by Administrator on 2014/12/13.
 */
var mongodb = require('./db'),
    BSON = require('mongodb').BSONPure;

var Admin = function(){};
module.exports = Admin;

//管理员登陆
Admin.login = function(callback){

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

