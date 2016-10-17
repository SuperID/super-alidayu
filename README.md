# super-alidayu
阿里大鱼短信服务Node.js客户端

## 安装

```bash
$ npm install super-alidayu --save
```

## 使用方法

```javascript
'use strict';

const AliDaYu = require('super-alidayu');

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
  .then(ret => console.log('success', ret))
  .catch(err => console.log('error', err));

// 发送短信，callback方式调用
client.sms(options, (err, ret) => {
  if (err) {
    console.log('error', err);
  } else {
    console.log('success', ret);
  }
});
```

相关资源：

+ [请求参数](http://open.taobao.com/doc2/apiDetail.htm?spm=0.0.0.0.UbZLDF&scopeId=11872&apiId=25450#s1)
+ [错误码解释](http://open.taobao.com/doc2/apiDetail.htm?apiId=25450&scopeId=11872#s6)

## 授权

```
The MIT License (MIT)

Copyright (c) 2016 SuperID | 免费极速身份验证服务

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
