const http = require('https');
const request = require('request');
// var querystring = require('querystring');
// const moment = require('moment');

var default_post_headers = {
    'content-type': 'application/json;charset=utf-8',
}

var agentOptions = {
    keepAlive: true
    // maxSockets: 256,
}
var default_timeout = 3000;

exports.get = function(url, options) {
    // console.log(`${moment().format()} HttpGet: ${url}`)
    return new Promise((resolve, reject) => {
        options = options || {};
        var httpOptions = {
            url: url,
            method: 'GET',
            timeout: options.timeout || default_timeout,
            headers: options.headers || default_post_headers,
            proxy: options.proxy || '',
            agentOptions: agentOptions
        }
        request.get(httpOptions, function(err, res, body) {
            // console.log(httpOptions);
            if (err) {
                reject(err);
            } else {
                if (res.statusCode == 200) {
                    resolve(body);
                } else {
                    reject(res.statusCode);
                }
            }
        }).on('error', function(e){
            console.log(e);
        });
    });
}

exports.post = function(url, postdata, options) {
    // console.log(`${moment().format()} HttpPost: ${url}`)
    return new Promise((resolve, reject) => {
        options = options || {};
        var httpOptions = {
            url: url,
            // body: JSON.stringify(postdata),
            form: postdata,
            method: 'POST',
            timeout: options.timeout || default_timeout,
            headers: options.headers || default_post_headers,
            proxy: options.proxy || '',
            agentOptions: agentOptions
        };
        request(httpOptions, function(err, res, body) {
            if (err) {
                reject(err);
            } else {
                if (res.statusCode == 200) {
                    resolve(body);
                } else {
                    reject(res.statusCode);
                }
            }
        }).on('error', console.error);
    });
};

exports.form_post = function(url, postdata, options) {
    // console.log(`${moment().format()} HttpFormPost: ${url}`)
    return new Promise((resolve, reject) => {
        options = options || {};
        var httpOptions = {
            url: url,
            form: postdata,
            method: 'post',
            timeout: options.timeout || default_timeout,
            headers: options.headers || default_post_headers,
            proxy: options.proxy || '',
            agentOptions: agentOptions
        };
        request(httpOptions, function(err, res, body) {
            if (err) {
                reject(err);
            } else {
                if (res.statusCode == 200) {
                    resolve(body);
                } else {
                    reject(res.statusCode);
                }
            }
        }).on('error', console.error);
    });
};