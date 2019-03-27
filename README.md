# BTEx cryptocurrency exchange APIs

The btex.com exchange APIs consists of the apis for public datas and apis for trading operations. 

btex.com also lists Perpetual contract pairs. You can find the APIs here. [Perpetual contract APIs](https://github.com/btex-dev/btex-api-demos/tree/master/btex-mx-api-docs)

## The Domain List

BTEX website https://btex.com https://btex.me

BTEX API domain https://api.btex.com https://api.btex.me

## SDKs
[PHP](https://github.com/btex-dev/btex-api-demos/blob/master/php-sdk) [JAVA](https://github.com/btex-dev/btex-api-demos/blob/master/java-sdk) [Python](https://github.com/btex-dev/btex-api-demos/blob/master/python-sdk) [GO](https://github.com/btex-dev/btex-api-demos/blob/master/golang-sdk) [NodeJS](https://github.com/btex-dev/btex-api-demos/blob/master/nodejs-sdk)

## Public API (Public data)
  
COIN_ANCHOR examples: BTC_USDT ETH_USDT ETH_BTC

Request Limits: 10000 req/hour 10 req/second

| url | function | description |
| :--- | :--- | :--- |
| /openapi1/pairs | get tickers of all markets | [detail](https://github.com/btex-dev/btex-api-demos/blob/master/exchange_restful_api_en.md#get-tickers)|
|  /openapi1/pair?pair=COIN_ANCHOR | get ticker of a single market | [detail](https://github.com/btex-dev/btex-api-demos/blob/master/exchange_restful_api_en.md#get-single-market-ticker)|
|  /openapi1/orderbook?pair=COIN_ANCHOR | get orderbook of a single market | [detail](https://github.com/btex-dev/btex-api-demos/blob/master/exchange_restful_api_en.md#get-orderbook)|
|  /openapi1/trades?pair=COIN_ANCHOR | get trades of a single market | [detail](https://github.com/btex-dev/btex-api-demos/blob/master/exchange_restful_api_en.md#get-trade-history)|
| /openapi1/k_data/?pair=COIN_ANCHOR&k_type=TYPE&rand_key=RND | get the K-Line data | [detail](https://github.com/btex-dev/btex-api-demos/blob/master/exchange_restful_api_en.md#get-kline-data)|

## Trading API (trading operations)

For security reason, most trading apis requires the signature for every requests. You can figure out the specific [signature algorithm](https://github.com/btex-dev/btex-api-demos/blob/master/signature_en.md#signature-algorithm)

| url | function | description |
| :--- | :--- | :--- |
| /openapi1/orderbook | get the market order book | [detail](https://github.com/btex-dev/btex-api-demos/blob/master/exchange_restful_api_en.md#get-orderbook)|
|  /openapi1/trades?pair=COIN_ANCHOR | get market trade lists | [detail](https://github.com/btex-dev/btex-api-demos/blob/master/exchange_restful_api_en.md#get-trade-history)|
| /openapi1/auth_api | operations for `get my info`, `buy`, `sell`, `get my orders`, `cancel orders`, `get my trade lists` | [detail](https://github.com/btex-dev/btex-api-demos/blob/master/exchange_restful_api_en.md#get-my-info)|
