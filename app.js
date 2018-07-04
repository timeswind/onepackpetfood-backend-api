var app = require('koa')();
var Raven = require('raven');
var logger = require('koa-logger');
var bodyparser = require('koa-bodyparser');
var errorhandler = require('koa-errorhandler');
var compress = require('koa-compress')
var scheme = require('koa-scheme');
var checkToken = require('./middlewares/checkToken');
var internalPermissionCheck = require('./middlewares/internalPermissionCheck');
var router = require('koa-frouter');
var config = require('config-lite');
var core = require('./lib/core');
var jwt = require('koa-jwt');
// var chatSocket = require('./lib/chat/chat_socket.js');
var publicKey = require('fs').readFileSync(config.publicKeyName);

app.use(checkToken());

// Raven.config('https://f8ae759bf75340c9a32e19d52e325415:1a8ed05c6cf0420cafa4b419d734e5f3@sentry.io/238080').install();

// app.on('error', function (err) {
//     Raven.captureException(err, function (err, eventId) {
//         console.log('Reported error ' + eventId);
//     });
// });

app.use(jwt({ secret: publicKey, algorithm: 'RS256' }).unless({ path: [/^\/socket\.io/, /^\/public/] }));
app.use(internalPermissionCheck());
app.use(errorhandler());
app.use(bodyparser());
process.env.NODE_ENV !== 'production' && app.use(logger());
app.use(scheme(config.schemeConf));
app.use(compress())
app.use(router(app, config.routerConf));
app.use(function *(){
  this.body = 'Resource not found';
});


const server = app.listen(config.port, function () {
  console.log('Server listening on: ', config.port);
});

// chatSocket.start(server);
