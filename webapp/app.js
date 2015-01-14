
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes/index');
var user = require('./routes/user');
var chat = require('./routes/chat');
var pdfkit = require('./routes/pdfkit');
var imageMagick = require('./routes/imageMagick');
var http = require('http');
var path = require('path');
var MongoStore = require('connect-mongo')(express);
var settings = require('./settings');
var flash = require('connect-flash');
var multer  = require('multer');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
  secret:settings.cookiesSecret,
  key:settings.db,
  cookie:{maxAge:1000*60*60*24*30},
  store:new MongoStore({
    db:settings.db
  })
}));

app.use(multer({
  dest: './public/images/user',
  rename: function (fieldname, filename) {
    return filename;
  }
}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'bower_components')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

routes(app);
pdfkit(app);
imageMagick(app);
var server = http.createServer(app);
chat(app,server);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
