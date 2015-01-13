/**
 * Created by Administrator on 2015/1/9.
 */
var PDFDocument = require('pdfkit');
var fs = require('fs');
var Article = require('../models/post.js');

module.exports = function(app){
    app.get('/article/pdf',function(req,res){
        var id = req.param('_id');
        var query = {
            _id:id
        }
        Article.get(query,function(err,article){
            if(err){
                res.status(400).send('bad request');
            }else{
                var doc = new PDFDocument();
                doc.pipe(fs.createWriteStream('./public/pdf/'+article[0].title+'.pdf'));
                doc.font('/Windows/Fonts/ygyxsziti2.0.ttf')
                    .fontSize(24)
                    .text(article[0].title.toString());
                doc.moveDown();
                doc.fontSize(18)
                    .text(article[0].post);
                article[0].pictures.forEach(function(item){
                    doc.image('public/images/user/'+item,{width: 450});
                })
                doc.end()
                res.status(200).send({
                    download:'/pdf/'+article[0].title+'.pdf'
                });
            }
        })

    })
}
