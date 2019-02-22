# BTEX.COM Contract API

BTEX Perpetual contract exchange RESTful API, we'll develope websocket API later。

You can get secret_key and access_key on btex.com. Please visit "Security >> Apply for API". https://btex.com/home/my_api

## The Domain List

BTEX Testnet https://testnet.btex.com

BTEX Website https://api.btex.com https://api.btex.me

## Signing_API_Requests

Important Note: Do not reveal your 'access_key' and 'secret_key' to anyone. They are as important as your password.

BTEX use HMAC Signature. [Signing API Requests](https://github.com/btex-dev/btex-api-demos/blob/master/btex-mx-api-docs/sign-ZH_CN.md)。

## SDK
DEMO: Python, PHP, Java, Golang, NodeJs SDK . [SDK](https://github.com/btex-dev/btex-api-demos/blob/master/btex-mx-api-docs/sdk/).

## response parameters
``` 
{
	"code": 1, //1 success，<0 fail，-100 -101 -102 -103 
	"info": "ok", //error informations
	"data": { //response data
	}
}
```

## Market Data API

kline, ticker, orderbook, contracts API.

**Just GET the URL, signature is not required!**

**Prefixed by /mx_data/**

|URL|Description|More|
|:----    |:--- |-----   |
|/mx_data/contracts | Get All contracts or single contract details | Add ?contract_id=1 to get BTCUSD contract|
|/mx_data/orderbook |get contract orderbook  |   |
|/mx_data/trades     |get contract trades |   |
|/mx_data/k_data     |get contract k-line |    |
|/mx_data/tickers    |get trade tickers |    |

## Contract Account API

**Prefixed by /mx_openapi1/**

|url|description|more|
|:----    |:--- |-----   |
|/mx_openapi1/account_info| get my balance | |
|/mx_openapi1/place_order| Plase long, short orders| |
|/mx_openapi1/cancel_order| cancel orders| |
|/mx_openapi1/active_orders| get my active orders| |
|/mx_openapi1/active_positions| get my open positions | |
|More trade data| .............| |
|/mx_openapi1/myorders| get my history orders | |
|/mx_openapi1/mytrades| get my history trades| |
|/mx_openapi1/mypositions| get all my closed positions| |
|/mx_openapi1/order_match_results| get match results for a given order_id|  ****important****|

