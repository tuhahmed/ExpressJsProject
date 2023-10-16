var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const cookieParser = require("cookie-parser");
const session = require('express-session');


var indexRouter = require('./routes/index');
var newRouter = require('./routes/new');
var postRouter = require('./routes/post');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var adminaRouter = require('./routes/adminanalytics');
var adminpRouter = require('./routes/adminposts');
var profileRouter = require('./routes/profile');
var servicesRouter = require('./routes/services');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var msgRouter = require('./routes/messages');
var searchRouter = require('./routes/search');
var discussionRouter = require('./routes/discussion');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(session({ secret: 'secret', saveUninitialized: true, resave: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/new', newRouter);
app.use('/post', postRouter);
app.use('/discussion', discussionRouter);
app.use('/admin', adminRouter);
app.use('/adminanalytics', adminaRouter);
app.use('/adminposts', adminpRouter);
app.use('/profile', profileRouter);
app.use('/services', servicesRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/messages', msgRouter);
app.use('/users', usersRouter);
app.use('/search', searchRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});





module.exports = app;