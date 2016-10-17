'use strict';

const AliDaYu = require('../');

describe('sms', function () {

  it('callback', function (done) {

    const client = new AliDaYu({
      app_key: 'xxxxxxx',
      secret: 'xxxxxxxx',
    });

    const options = {
      sms_free_sign_name: '登录验证',
      sms_param: {
        code: '1234',
        product: '一登',
      },
      rec_num: '13800138000',
      sms_template_code: 'SMS_4045620',
    };

    // 发送短信，promise方式调用
    // client.sms(options)
    //   .then(ret => console.log('success', ret))
    //   .catch(err => console.log('error', err));

    // 发送短信，callback方式调用
    client.sms(options, (err, ret) => {
      if (err) {
        console.log('error', err);
      } else {
        console.log('success', ret);
      }
      done();
    });

  });

  it('promise', function (done) {

    const client = new AliDaYu({
      app_key: 'xxxxxxx',
      secret: 'xxxxxxxx',
    });

    const options = {
      sms_free_sign_name: '登录验证',
      sms_param: {
        code: '1234',
        product: '一登',
      },
      rec_num: '13800138000',
      sms_template_code: 'SMS_4045620',
    };

    // 发送短信，promise方式调用
    client.sms(options)
      .then(ret => {
        console.log('success', ret);
        done();
      })
      .catch(err => {
        console.log('error', err);
        done();
      });

  });

});
