var app = require('koa')();
var logger = require('koa-logger');
var bodyparser = require('koa-bodyparser');
var errorhandler = require('koa-errorhandler');
var compress = require('koa-compress')
var scheme = require('koa-scheme');
var checkToken = require('./middlewares/checkToken');
var internalPermissionCheck = require('./middlewares/internalPermissionCheck');
var router = require('koa-frouter');
var config = require('config-lite');
var jwt = require('koa-jwt');
// var chatSocket = require('./lib/chat/chat_socket.js');
var publicKey = require('fs').readFileSync(config.publicKeyName);

app.use(checkToken());

app.use(jwt({ secret: publicKey, algorithm: 'RS256' }).unless({ path: [/^\/socket\.io/, /^\/public/] }));
app.use(internalPermissionCheck());
app.use(errorhandler());
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
  extendTypes: {
    text: ['text/xml', 'application/xml']
  }
}));

process.env.NODE_ENV !== 'production' && app.use(logger());

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
// app.use(logger())

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
