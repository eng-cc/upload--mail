var email = require('../conf.js').email;
var nodemailer = require('nodemailer');

var transports = nodemailer.createTransport({
    service: '163',
    host: email.host,
    secureConnection: true,
    auth: {
        user: email.user,
        pass: email.password
    }
});

var sendEmail = function(url,cb) {
    var opts = {
        from: email.user,
        to: email.toMail,
        subject: '形式与政策作业',
        html:  "ppt地址 "+url +' 请尽提前下载'|| '接收失败，请联系腾讯客服'
    };
    transports.sendMail(opts, function(err, res) {
        if (err) {
            cb(false);
            console.log('mail' + err)
        } else {
            cb(true);
            console.log('send:' + res.response);
        }
        transports.close();
    });
};

module.exports = sendEmail;
