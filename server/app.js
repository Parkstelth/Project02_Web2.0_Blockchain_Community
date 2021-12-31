var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const Web3 = require('web3');
const db = require('./models');

var indexRouter = require('./routes/index');
var ganacheRouter = require('./routes/ganache');
var signInRouter = require('./routes/login')
var ethFaucetRouter = require('./routes/ethfaucet');;
var loadPostRouter = require('./routes/loadpost');
var postingRouter = require('./routes/posting');
var usersRouter = require('./routes/users');
var deployERC20Router = require('./routes/deploy');
var walletRouter = require('./routes/wallet/index');
var serveTokenRouter = require('./routes/servetoken');
var userInfoRouter = require('./routes/userinfo');
var mintERC721Router = require('./routes/mintERC721');

var app = express();
const port = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/', indexRouter);
app.use('/ganache', ganacheRouter);
app.use('/users', usersRouter);
app.use('/ethfaucet', ethFaucetRouter);
app.use('/login', signInRouter);
app.use('/loadpost', loadPostRouter);
app.use('/posting', postingRouter);
app.use('/sign', walletRouter);
app.use('/deploy', deployERC20Router);
app.use('/servetoken', serveTokenRouter);
app.use('/userinfo', userInfoRouter);
app.use('/minterc721', mintERC721Router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use((req, res) => {
	res.header("Access-Control-Allow-Origin", "*"); // 모든 도메인
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

app.set('port', port);
app.listen(app.get('port'), () => {
  console.log(`app is listening in http://localhost:${app.get('port')}`);
});

module.exports = app;
