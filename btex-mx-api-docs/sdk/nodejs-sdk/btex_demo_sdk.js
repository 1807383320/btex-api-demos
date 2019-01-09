const btexsdk = require('./scripts/btex_sdk');

function run() {
    // 请在运行之前填写config/default.json中的信息
    // access_key 及 secretkey 需要去 btex.com上申请

    // 获取市场
    // btexsdk.contracts().then(console.log);

    // 获取某个合约交易最新行情
    // btexsdk.tickers( contract_id ).then(console.log);

    // 获取某个合约交易的市场深度
    // btexsdk.orderbook( contract_id, depth );

    // 获取某个合约交易历史
    // btexsdk.trades( contract_id, page_size );

    // 获取K线数据
    // btexsdk.K_data( contract_id, k_type, k_amount );

    // 获取合约账户信息
    // btexsdk.account_info().then( console.log );

    // 获取我的活动委托单
    // btexsdk.active_orders( contract_id, amount ).then(console.log);

    // 获取我的当前仓位
    // btexsdk.active_positions( contract_id ).then(console.log);

    // 下单
    // btexsdk.place_order( contract_id, price, amount, leverage, direction, type, is_cross );

    // 取消订单
    // btexsdk.cancel_order(XXXXXXX).then(console.log);

    // 获取我的委托历史
    // btexsdk.myorders(contract_id, page, page_size);

    // 获取我的已平仓位
    // btexsdk.mypositions(contract_id, page, page_size);

}
run();




