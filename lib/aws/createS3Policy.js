var crypto = require("crypto");
var amazonConfig = require('../../config/amazon')
var accessKeyID = amazonConfig.accessKey;
var secretAccessKey = amazonConfig.secretAccessKey;

module.exports = function (bucket, region, folder, expiration, date) {

  // var bucket = bucket;
  // var region = region; // overwrite with your region
  // var folder = folder; // overwrite with your folder
  // var expiration = expiration; // overwrite date
  // var date = date; // overwrite date
  var serviceName = "s3";

  var s3Policy = {
    "expiration": expiration,
    "conditions": [
      {"bucket": bucket},
      ["starts-with", "$key", folder],
      {"acl": "public-read"},
      ["starts-with", "$Content-Type", "image/"],
      {"x-amz-meta-uuid": "14365123651274"},
      ["starts-with", "$x-amz-meta-tag", ""],
      {"x-amz-credential": accessKeyID + "/" + date + "/" + region + "/" + serviceName +"/aws4_request"},
      {"x-amz-algorithm": "AWS4-HMAC-SHA256"},
      {"x-amz-date": date + "T000000Z" }
    ]
  };

  var base64Policy = new Buffer(JSON.stringify(s3Policy), "utf-8").toString("base64");
  console.log('base64Policy:', base64Policy);

  var signatureKey = getSignatureKey(secretAccessKey, date, region, serviceName);
  var s3Signature = crypto.createHmac('sha256', signatureKey).update(base64Policy, 'utf8').digest('hex')
  console.log('s3Signature:', s3Signature);

  return {'Policy': base64Policy, "X-Amz-Signature": s3Signature}

}

function getSignatureKey(key, dateStamp, regionName, serviceName) {
  var kDate = crypto.createHmac('sha256', "AWS4" + key).update(dateStamp, 'utf8').digest();
  var kRegion = crypto.createHmac('sha256', kDate).update(regionName, 'utf8').digest();
  var kService = crypto.createHmac('sha256', kRegion).update(serviceName, 'utf8').digest();
  var kSigning = crypto.createHmac('sha256', kService).update("aws4_request", 'utf8').digest();
  // var kDate = crypto.HmacSHA256(dateStamp, "AWS4" + key);
  // var kRegion = crypto.HmacSHA256(regionName, kDate);
  // var kService = crypto.HmacSHA256(serviceName, kRegion);
  // var kSigning = crypto.HmacSHA256("aws4_request", kService);

  return kSigning;
}
