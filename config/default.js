var path = require('path');

module.exports = {
  port: process.env.PORT || 8080,
  privateKeyName: 'platform.rsa',
  publicKeyName: 'platform.rsa.pub',
  mongodb: {
    url: 'mongodb://127.0.0.1:27017/onepackdogfood',
    developmentUrl: 'mongodb://127.0.0.1:27017/onepackdogfood',
    productionUrl: 'mongodb://127.0.0.1:27017/onepackdogfood'
  },
  schemeConf: path.join(__dirname, './default.scheme'),
  routerConf: { wildcard: '_', root: 'routes' }
};
