/**
 * Created by Administrator on 2015/1/4.
 */
var mongodb = require('./db'),
    BSON = require('mongodb').BSONPure;

function Post(author,title,post,pictures){
    this.author = author;
    this.title = title;
    this.post = post;
    this.pictures = pictures
}

module.exports = Post;

//存储文章及信息
Post.prototype.save = function(callback){
    var date = new Date();
    var time = {
        date:date,
        year:date.getFullYear(),
        month:date.getFullYear()+'-'+(date.getMonth()+1),
        day:date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDay()),
        minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    };

    var post = {
        author:this.author,
        time:time.minute,
        title:this.title,
        post:this.post,
        pictures:this.pictures
    };

    //open database
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        };
        //read posts collection
        db.collection('posts',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            };
            collection.insert(post,{
                safe:true
            },function(err,doc){
                mongodb.close();
                if(err){
                    return callback(err);
                };
                callback(null,doc);
            })
        })
    })
};

//读取posts集合
Post.get = function(query,callback){

    var flag = false;//根据id查询为true
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        };

        //判断查询条件
        for(var i in query){
            if(i == '_id'){
                query['_id'] = BSON.ObjectID.createFromHexString(query[i]);
                flag = true;
                break;
            }
        }

        db.collection('posts',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            };
            var doc = flag?collection.find(query):collection.find(query,{fields:{post:0}});
            doc.toArray(function(err,doc){
                mongodb.close();
                if(err){
                    return callback(err);
                };
                return callback(null,doc);
            })
        })
    })
};

//修改文章信息
Post.modify = function(modify,callback){
    var date = new Date();
    var time = {
        date:date,
        year:date.getFullYear(),
        month:date.getFullYear()+'-'+(date.getMonth()+1),
        day:date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDay()),
        minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    };
    mongodb.open(function(err,db){
        if(err){
             mongodb.close();
             return callback(err);
        };
        db.collection('posts',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.findAndModify({_id:BSON.ObjectID.createFromHexString(modify._id)},[['_id',1]],{
                $set:{title:modify.title,post:modify.post,time:time.minute}
            },function(err,doc){
                mongodb.close();
                if(err){
                    return callback(err)
                };
                return callback(null,doc);
            })
        })
    })
};

//正则查询
Post.findByKeyWord = function(keyword,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        };
        db.collection('posts',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            };
            var pattern = new RegExp(keyword, "i");
            collection.find({"$or":[{"title":pattern},{"post":pattern},{"author":pattern}]}).toArray(function(err,doc){
                mongodb.close();
                if(err){
                    return callback(err);
                };
                return callback(null,doc);
            })
        })
    })
}