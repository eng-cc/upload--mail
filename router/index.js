var express = require('express');
var router = express.Router();
var qiniu = require('qiniu');
var sendMail = require('../contral/sendMail.js');

qiniu.conf.ACCESS_KEY = "b_vFaxabRaSANFpAMwDBVlaoRs7ArtoGeYLJ9gFn";
qiniu.conf.SECRET_KEY = 'R2kTmYVqVDQMz6Fq6slGpoEmm6tae3SGOoY7HSHP';

router.get('/upToken', function(req, res, next) {
    var myUpToken = new qiniu.rs.PutPolicy('scc1');
    var token = myUpToken.token();
    //moment.locale('en');
    res.header("Cache-Control", "max-age=0, private, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    if (token) {
        console.log(token);
        res.json({
            uptoken: token
        });
    };
});

var downloadurl = function(domain, key) {
    var baseurl = qiniu.rs.makeBaseUrl(domain, key);
    var policy = new qiniu.rs.GetPolicy();
    return policy.makeRequest(baseurl);
};

router.post('/url', function(req, res) {
    var url = downloadurl(req.body.domain, req.body.key);
    res.end(url);
});

router.get('/upUrl', function(req, res) {
    // console.log(req.qurey);
    var url = req.url.split('=')[1];
    console.log(url);
    url = 'http://7q5abk.com1.z0.glb.clouddn.com/' + url;
    sendMail(url, function(succ) {
        if (succ) {
            res.json({
                succ: true
            })
        } else {
            res.json({
                succ: false
            })
        }
    });
});


module.exports = router;
