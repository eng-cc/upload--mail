var express = require('express');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var routers = require('./router/index.js');
var app = express();


//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
//设置文件静态路径
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static('views'));
//输出http状态码
app.use(logger('dev'));
//解析body传输的内容
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//支持跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

//路由
app.use('/',routers);

//404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(process.env.PORT || 5100);
