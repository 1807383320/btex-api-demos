var config = require('../config/config');
var CryptoJS = require('crypto-js');
var Promise = require('bluebird');
var HmacSHA256 = require('crypto-js/hmac-sha256')
var http = require('./reqApi');
var common = require('./common');
var querystring = require('querystring');

const URL_BTEX_API = 'https://api.btex.com';
//for testnet
//const URL_BTEX_API = 'https://testnet.btex.com';

const DEFAULT_HEADERS = {
    "Content-Type": "application/json;charset=utf-8",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36"
}

var default_timeout = 6000;

function createSign( data ) {
    var pars = [];
    data.secret_key = config.btex.secret_key;
    data.ts = new Date().getTime()/1000;
    for (let item in data) {
        pars.push(item + "=" + (data[item]));
    }
    var p = pars.sort().join("&");
    var hash = HmacSHA256(p, data.secret_key);
    var Signature = (CryptoJS.enc.Base64.stringify(hash));
    return Signature;
}

function call_api(method, path, body) {
    return new Promise(resolve => {
        var headers = DEFAULT_HEADERS;
        var url = URL_BTEX_API + path;
        if (method == 'GET') {
            var url = URL_BTEX_API + path;
            if( body ){
                url = url + '?' + querystring.stringify( body );
            }
            http.get(url, {
                timeout: default_timeout,
                headers: headers
            }).then(data => {
                let json = JSON.parse(data);
                if (json.code == '1') {
                    resolve(json.data);
                } else {
                    console.log('GET URL='+url+' 调用错误1', json);
                    resolve(null);
                }
            }).catch(ex => {
                console.log(method, path, '异常', ex);
                resolve(null);
            });
        } else if (method == 'POST') {
            http.post(url, body, {
                timeout: default_timeout,
                headers: headers
            }).then(data => {
                let json = JSON.parse(data);
                if (json.code == '1') {
                    resolve(json.data);
                } else {
                    console.log('调用错误2', json);
                    resolve(null);
                }
            }).catch(ex => {
                console.log(method, path, '异常', ex);
                resolve(null);
            });
        }
    });
}

var btex_sdk = {
    // 获取所有市场
    contracts: function() {
        var path = '/mx_data/contracts';
        var body = {};
        return call_api('GET', path, body);
    },
    // 获取单个市场
    tickers: function(contract_id) {
        var path = '/mx_data/tickers';
        var body = {};
        body.contract_id = contract_id;
        return call_api('GET', path, body);
    },
    // 获取K线数据
    K_data: function(contract_id, k_type, k_amount) {
        var path = '/mx_data/k_data';
        var body = {};
        body.contract_id = contract_id;
        body.k_type = k_type; // 5m，15m，30m，1h，2h，4h，8h，1d； m:分钟，h:小时，d:天数
        body.k_amount = k_amount; // 可选，获取数据的条数，默认最新80条
        body.rand_key = Math.random() * (1e8 - 1e7) + 1e7;
        return call_api('GET', path, body);
    },
    // 获取市场委托列表
    orderbook: function(contract_id, depth) {
        var path = '/mx_data/orderbook';
        var body = {};
        body.contract_id = contract_id;
        body.depth = depth;
        return call_api('GET', path, body);
    },
    // 获取市场成交历史
    trades: function(contract_id, page_size) {
        var path = '/mx_data/trades';
        var body = {};
        body.contract_id = contract_id;
        body.page_size = page_size;
        return call_api('GET', path, body);
    },
    // 获取我的余额
    account_info: function() {
        var path = '/mx_openapi1/account_info';
        var body = {};
        body.access_key = config.btex.access_key;
        var sign = createSign(body);
        body.sign = sign;
        return call_api('POST', path, body);
    },
    // 获取我的委托列表
    active_orders: function(contract_id) {
        var path = '/mx_openapi1/active_orders';
        var body = {};
        body.contract_id = contract_id; // 市场，格式：BTC_USDT
        body.access_key = config.btex.access_key; // 公钥，用户申请即可
        var sign = createSign(body);
        body.sign = sign;
        return call_api('POST', path, body);
    },
    // 获取我的当前仓位
    active_positions: function(contract_id) {
        var path = '/mx_openapi1/active_positions';
        var body = {};
        body.contract_id = contract_id; // 市场，格式：BTC_USDT
        body.access_key = config.btex.access_key; // 公钥，用户申请即可
        var sign = createSign(body);
        body.sign = sign;
        return call_api('POST', path, body);
    },
    // 取消委托订单
    cancel_order: function(order_id) {
        var path = '/mx_openapi1/cancel_order';
        var body = {};
        body.order_id = order_id; // 市场，格式：BTC_USDT
        body.access_key = config.btex.access_key; // 公钥，用户申请即可
        var sign = createSign(body);
        body.sign = sign;
        return call_api('POST', path, body);
    },
    // 做多做空
    place_order: function(contract_id, price, amount, leverage, direction, type, is_cross) {
        var path = '/mx_openapi1/place_order';
        var body = {};
        body.contract_id = contract_id;
        body.price = price;
        body.amount = amount;
        body.leverage = leverage;
        body.direction = direction;
        body.type = type;
        body.is_cross = is_cross;
        body.access_key = config.btex.access_key; // 公钥，用户申请即可
        var sign = createSign(body);
        body.sign = sign;
        return call_api('POST', path, body);
    },
    // 获取我的委托历史
    myorders: function(contract_id, page, page_size) {
        var path = '/mx_openapi1/myorders';
        var body = {};
        body.contract_id = contract_id;
        body.page = page;
        body.page_size = page_size;
        body.access_key = config.btex.access_key; // 公钥，用户申请即可
        var sign = createSign(body);
        body.sign = sign;
        return call_api('POST', path, body);
    },
    // 获取我的交易历史
    mytrades : function(contract_id, page, page_size) {
        var path = '/mx_openapi1/mytrades ';
        var body = {};
        body.contract_id = contract_id;
        body.page = page;
        body.page_size = page_size;
        body.access_key = config.btex.access_key; // 公钥，用户申请即可
        var sign = createSign(body);
        body.sign = sign;
        return call_api('POST', path, body);
    },
    // 获取某个委托的成交明细
    order_match_results : function(order_id) {
        var path = '/mx_openapi1/order_match_results ';
        var body = {};
        body.order_id = order_id;
        body.access_key = config.btex.access_key; // 公钥，用户申请即可
        var sign = createSign(body);
        body.sign = sign;
        return call_api('POST', path, body);
    },
    // 获取我的已平仓位
    mypositions: function(contract_id, page, page_size) {
        var path = '/mx_openapi1/mypositions';
        var body = {};
        body.contract_id = contract_id; // 市场，格式：BTC_USDT
        body.page = page;
        body.page_size = page_size;
        body.access_key = config.btex.access_key; // 公钥，用户申请即可
        var sign = createSign(body);
        body.sign = sign;
        return call_api('POST', path, body);
    },
}

module.exports = btex_sdk;
