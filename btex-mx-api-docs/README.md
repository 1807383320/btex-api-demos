# BTEX 合约API

BTEX合约交易，提供了强大的全套RESTful API支持，后续将继续开发出包括但不限于websocket等形式的API支持。

用户在用户中心申请API后，会得到一个secret_key和一个access_key，用于API接口调用中的身份识别和数据校验。 申请地址：https://btex.com/home/my_api

调用地址

BTEX 测试网路 https://testnet.btex.com/

BTEX 正式网路 https://api.btex.com/

## 签名算法

为了对API用户进行身份识别和防止数据在发送过程中被篡改，我们使用了基于HMAC的签名算法，详细的签名算法请参见 [签名算法](https://github.com/btex-dev/btex-api-demos/blob/master/btex-mx-api-docs/sign-ZH_CN.md)。

## SDK
我们开发了多种编程语言的SDK供大家使用，部分语言在开发中。[SDK](https://github.com/btex-dev/btex-api-demos/blob/master/btex-mx-api-docs/sdk/)。


## 接口返回值标准格式
``` 
{
	"code": 1, //1表示成功，<0 表示失败，-100 -101 -102 -103 分别代表不同的含义
	"info": "ok", //错误信息
	"data": {
	}
}
```

## 市场公开数据接口

详见接口列表

** MX市场公开数据接口前缀为 /mx_data/ **

|地址|含义|其他说明|
|:----    |:--- |-----   |
|/mx_data/contracts | 获取合约信息 | 可以带contract_id取单个  |
|/mx_data/orderbook |获取某个合约的买卖单  |可以加depth参数    |
|/mx_data/trades     |某个合约的成交历史  |可以翻页，但是不能翻太多    |
|/mx_data/k_data     |某个合约的K线数据  |参数自定    |
|/mx_data/tickers    |只获取交易数据(只获取ticker，不获取其他信息)  |    |

## 个人账户、交易相关接口

** 个人账户、交易相关的API前缀为 /mx_openapi1/   1表示当前是第一版接口 **

|地址|含义|其他说明|
|:----    |:--- |-----   |
|/mx_openapi1/account_info|获取账户余额信息 | |
|/mx_openapi1/place_order| 下委托| |
|/mx_openapi1/cancel_order|取消委托| |
|/mx_openapi1/active_orders| 获取我的活动委托| |
|/mx_openapi1/active_positions| 获取我的未平仓仓位 | |
|以下是一些历史数据显示| .............| |
|/mx_openapi1/myorders| 获取我的委托历史 | |
|/mx_openapi1/mytrades| 获取我的成交历史| |
|/mx_openapi1/mypositions| 获取我的仓位历史| |
|/mx_openapi1/order_match_results| 某个委托的撮合成交历史|  **** 这个很重要 ****|

