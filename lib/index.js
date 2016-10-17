'use strict';

/**
 * Alidayu client for Node.js 阿里大鱼短信服务Node.js客户端
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

const utils = require('lei-utils');
const request = require('request');


class AliDaYu {

  constructor(options) {
    options = options || {};
    this._options = {};
    this._options.gw = 'http://gw.api.taobao.com/router/rest';
    this._options.v = '2.0';
    this._options.format = 'json';
    this._options.sign_method = 'md5';

    for (const key in options) {
      this._options[key] = options[key];
    }
  }

  _commonArgs(params) {
    params = params || {};
    params.app_key = this._options.app_key;
    params.v = this._options.v;
    params.sign_method = this._options.sign_method;
    params.format = this._options.format;
    params.timestamp = utils.date('Y-m-d H:i:s');
    return params;
  }

  _sign(params) {
    params = this._commonArgs(params);

    const keys = Object.keys(params).sort();
    const signString = keys.map(function (k) {
      return k + params[k];
    }).join('');

    const str = this._options.secret + signString + this._options.secret;

    return utils.md5(str).toUpperCase();
  }

  _formatArgs(params) {
    for (const i in params) {
      if (typeof params[i] === 'object') {
        params[i] = JSON.stringify(params[i]);
      }
    }
    return params;
  }

  _request(params, callback) {
    params = this._formatArgs(params);
    params.sign = this._sign(params);

    const body = Object.keys(params).map(function (k) {
      return k + '=' + params[k];
    }).join('&');

    request.post(this._options.gw, {
      form: params,
    }, function (err, res, body) {
      if (err) return callback(err);
      let data;
      try {
        data = JSON.parse(body.toString());
      } catch (err) {
        return callback(err, body);
      }
      if (data.error_response) {
        callback(data.error_response, data);
      } else {
        callback(null, data);
      }
    });
  }

  /**
   * 发送短信
   *
   * @param {Object} params
   * @param {Function} callback
   *
   * @example:
   * ```
   * sms({
   *   sms_free_sign_name: '登录验证',
   *   sms_param: {
   *     code: '1234',
   *     product: '一登',
   *   },
   *   rec_num: '13800138000',
   *   sms_template_code: 'SMS_4045620',
   * }, callback);
   * ```
   */
  sms(params, callback) {
    params = params || {};
    params.method = 'alibaba.aliqin.fc.sms.num.send';
    params.sms_type = 'normal';
    callback = callback || createPromiseCallback();
    this._request(params, callback);
    return callback.promise;
  }

}

function createPromiseCallback() {
  const callback = (err, ret) => {
    if (err) {
      callback.reject(err);
    } else {
      callback.resolve(ret);
    }
  };
  callback.promise = new Promise((resolve, reject) => {
    callback.resolve = resolve;
    callback.reject = reject;
  });
  return callback;
}

module.exports = AliDaYu;
