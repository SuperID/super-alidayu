'use strict';

/**
 * Alidayu client for Node.js 阿里大鱼短信服务Node.js客户端
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var utils = require('lei-utils');
var request = require('request');
var leiPromise = require('lei-promise');
var urlencode = require('urlencode');


function AliDaYu(options) {
  options = options || {};
  this._options = {};
  this._options.gw = 'http://gw.api.taobao.com/router/rest';
  this._options.v = '2.0';
  this._options.format = 'json';
  this._options.sign_method = 'md5';

  for (var key in options) {
    this._options[key] = options[key]
  }
}

AliDaYu.prototype._commonArgs = function (args) {
  args = args || {};
  args.app_key = this._options.app_key;
  args.v = this._options.v;
  args.sign_method = this._options.sign_method;
  args.format = this._options.format;
  args.timestamp = utils.date('Y-m-d H:i:') + '01';
  return args
};

AliDaYu.prototype._sign = function (args) {
  args = this._commonArgs(args);

  var keys = Object.keys(args).sort();
  var signString = keys.map(function (k) {
    return k + args[k];
  }).join('');

  var str = this._options.secret + signString + this._options.secret;

  return utils.md5(str).toUpperCase();
};

AliDaYu.prototype._encodeArgs = function (args) {
  for (var i in args) {
    args[i] = urlencode(args[i]);
  }
  return args;
};

AliDaYu.prototype._formatArgs = function (args) {
  for (var i in args) {
    if (typeof args[i] === 'object') {
      args[i] = JSON.stringify(args[i]);
    }
  }
  return args;
};

AliDaYu.prototype._request = function (args, callback) {
  args = this._formatArgs(args);
  args.sign = this._sign(args);
  args = this._encodeArgs(args);

  var body = Object.keys(args).map(function (k) {
    return k + '=' + args[k];
  }).join('&');

  request.post(this._options.gw, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: body,
  }, function (err, res, body) {
    if (err) return callback(err);
    try {
      var data = JSON.parse(body.toString());
    } catch (err) {
      return callback(err, body);
    }
    callback(null, data);
  });
};

AliDaYu.prototype.sms = leiPromise.promisify(function (args, callback) {
  args = args || {};
  args.method = 'alibaba.aliqin.fc.sms.num.send';
  args.sms_type = 'normal';
  this._request(args, callback);
}, 2, true);


module.exports = AliDaYu;
