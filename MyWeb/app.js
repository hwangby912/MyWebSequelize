var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');
var sequelizer=require('./models').sequelize;

/* const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto('nodejs','root','root',{
 host:'localhost',
 port:'3306'
});
auto.run((err)=>{
 if(err) throw err;
})
 */
var app = express();
sequelizer.sync(); // (==>DB에 member2s 라는 테이블이 생긴다)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//동적 view ejs,pug,jsp,php,asp
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
//js,css,img
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('web project'));
app.use(session({
 name:'JES_SID',
 timeout:30,
 resave:false,//재할당 x
 saveUninitialized:false,//저장 내용없으면 할당 받지 않겠다?
 secret:'web project',
 cookie:{
   httpOnly:true,
   secure:false 
 }
 }));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/about', require('./routes/about'));
app.use('/member_insert', require('./routes/member_insert'));
app.use('/member_delete', require('./routes/member_delete'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/search_carInfo_template', require('./routes/search_carInfo_template'));
app.use('/search_carInfo', require('./routes/search_carInfo'));
app.use('/update_carInfo', require('./routes/update_carInfo'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
 next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
 // set locals, only providing error in development
 console.error(err.stack);
 res.locals.message = err.message;
 res.locals.error = req.app.get('env') === 'development' ? err : {};

 // render the error page
 res.status(err.status || 500);
 res.render('error');
});

module.exports = app;

