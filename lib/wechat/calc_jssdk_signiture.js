const jsapi_ticket = require('./jsapi_ticket')

// noncestr
 var createNonceStr = function() {
    return Math.random().toString(36).substr(2, 15);
};

// timestamp
var createTimeStamp = function () {
    return parseInt(new Date().getTime() / 1000) + '';
};

 // 计算签名方法
 var calcSignature = function (ticket, noncestr, ts, url) {
    var str = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp='+ ts +'&url=' + url;
    shaObj = new jsSHA(str, 'TEXT');
    return shaObj.getHash('SHA-1', 'HEX');
}


module.exports = function (ticket, url) {
    const noncestr = createNonceStr()
    const timestamp = createTimeStamp()
    return calcSignature(ticket, noncestr, timestamp, url);
}
