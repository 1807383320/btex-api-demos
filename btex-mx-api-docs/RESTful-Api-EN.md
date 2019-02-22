
# Market Data API

> Get Contracts Data (and single contract data)

#### GET /mx_data/contracts ####

	** Request: ** 

	| Param |required |data type|description|default|value range|
	|:----    |:---|:----- |-----   | -----   | ----- |  
	|contract_id |false |int |contract_id   | 0 | 1,2,3,4,101,102...10000 | |  

	**Response:** 

	|Param|data type|description|value range|
	|:----    |:---|:----- |-----  | 
	|code |int | response code  |   |
	|info |string | error informations  |   |
	|data |array| response data  |   | |

	**Response:description**

	``` 
{
	"code": 1,
		"info": "ok",
		"data": [{
			"contract_id": "1",					    #contract id
				"symbol": "BTC_USD",				    #contract symbol 
				"settle_anchor": "BTC",				    #Settle Anchor
				"quote_anchor": "USD",				    #Qquote anchor
				"contract_anchor": "USD",			    #single contract anchor
				"contract_value": "1.00000000",         #single contract value
				"type": "1",				            #contract type，1:Perpetual contract, 2: futures
				"expiry": "0000-00-00 00:00:00",        #delivery time
				"max_leverage": "100",	                #max leverage
				"maintance_margin": "0.00500000",       #maintance margin
				"maker_fee": "-0.00050000",				#maker fee
				"taker_fee": "0.00150000",				#taker fee
				"settle_fee": "0.00000000",				#delivery fee
				"price_dec": "2",						#price decimal
				"anchor_dec": "8",						#anchor decimal
				"status": "1",							#contract，1:in trading ,0:suspend ,-1: permanent stop trade
				"isreverse": "1",						#1:reverse contract，-1:Forward contract
				"allow_cross": "1",						#allow cross，1: allow，-1: not allow
				"allow_leverages": "1,5,10,25,50,100",	#leverages
				"max_order_num": "20",					#max active orders in the market
				"max_amount": 50000,					#Max conts. in one order
				"min_amount": 10,					    #Min conts. in one order
				"max_position_amount": 50000,			#Max positions
		}]
}
```

> Get Contract Tickers

#### GET /mx_data/tickers #####

**Request:** 

|Param|required|data type|description|default|value range|
|:----    |:---|:----- |-----   | -----   | ----- |  
|contract_id |false |int |合约ID   |  |  | |  

**Response:** 

|Param|data type|description|value range|
|:----    |:---|:----- |-----  | 
|code |int | response code  |   |
|info |string | error informations  |   |
|data |array|response data  |   | |

**Response:description**

``` 
{
	"code": 1,
		"info": "ok",
		"data": [{
			"contract_id": "1",
			"min": "3475.09000000",				#24 Hour High
				"max": "4270.00000000",				#24 Hour Low
				"latest": "3902.07000000",			#Lates Price
				"change_24h": "0.0684",				#24 Hour range
				"amount": "27259252",				#24 Hour amount
				"volumn": "7067.4340786",			#24 Hour Volumn
				"open_interest": "11111",			#Open Interest
				"index_price": "3890.3647111111",	#Index Price
				"fair_price": "3890.389890416",		#Fair Price
				"next_funding_rate": "1.25E-5",		#Predict Next Funding Rate
		}]
}
```

> Get Contract Orderbook

#### GET /mx_data/orderbook ####

**Request:** 

|Param|required|data type|description|default|value range|
|:----    |:---|:----- |-----   | -----   | ----- |  
|contract_id |true |int |Contract ID   |  |  |
|depth |false |int |Depth type   |10  | 5, 10, 15, 20, 30, 50  | |

**Response:** 

|Param|data type|description|value range|
|:----    |:---|:----- |-----  | 
|code |int | response code   |   |
|info |string | error informations  |   |
|data |object|response data  |   |
|bids |array| Bids |   | 
|asks |array| Asks |   | |

**Response:description**

``` 
{
	"code": 1,
		"info": "ok",
		"data": {
			"bids": [{
				"price": 3911.02,		#Price
					"amount": 7182			#Amount
			}, {
				"price": 3910.8,
				"amount": 8022
			}, {
				"price": 3910.79,
				"amount": 11127
			}, {
				"price": 3909.95,
				"amount": 17948
			}],
			"asks": [{
				"price": 3913.64,
				"amount": 7592
			}, {
				"price": 3913.71,
				"amount": 6580
			}, {
				"price": 3914.01,
				"amount": 12931
			}, {
				"price": 3914.02,
				"amount": 12350
			}, {
				"price": 3914.1,
				"amount": 19106
			}]
		}
}
```

> Get Contract Trades History

#### GET /mx_data/trades ####

**Request:** 

|Param|required|data type|description|default|value range|
|:----    |:---|:----- |-----   | -----   | ----- |  
|contract_id |true |int |Contract ID   |  |     |
|page_size |false|int |page size  |  20 |1-300  | |

**Response:** 

|Param|data type|description|value range|
|:----    |:---|:----- |-----  | 
|code |int | response code   |   |
|info |string | error informations  |   |
|data |object|response data  |   |
|lists |array|response data |   |  |

**Response:description**

``` 
{
	"code": 1,
		"info": "ok",
		"data": {
			"lists": [{
				"trade_id": "1234567",		#trade id
					"time": 1543224980,			#trade time
					"price": "3898.73000000",	#price
					"num": "4116",				#amount
					"type": "sell"				#buy/sell
			}]
		}
}
```

> Get Contract K-Line Data

#### GET /mx_data/k_data ####

**Request:** 

|Param|required|data type|description|default|value range|
|:----    |:---|:----- |-----   | -----   | ----- |  
|contract_id |true |int |Contract ID   |  |     |
|k_type |false| string| K-Line range  |  5m | 5m, 15m, 30m, 1h, 4h, 8h, 1d|
|k_amount |false| int| amount  | 100 | 1-3000   |

**Response:** 

|Param|data type|description|value range|
|:----    |:---|:----- |-----  | 
|code |int | response code   |   |
|info |string | error informations  |   |
|data |object|response data  |   |
|lists |array|response data |   |  |

**Response:description**

``` 
{
	"code": 1,
		"info": "ok",
		"data": {
			"lists": [
				[
					"1543219200000",
			"3976.81000000",
			"3976.86000000",
			"3876.78000000",
			"3903.01000000",
			"1078399",
			"4251467748.36"
				],
				[
					"1543222800000",
				"3903.01000000",
				"3940.18000000",
				"3862.47000000",
				"3863.51000000",
				"830709",
				"3242167118.97"
				]
			]
#description (From left to right)：timestamp，open，high，low，close，amount，volumn
		}
}
```

-----
# BTEX Trade API (Signature required)

> get Contract Account Data

#### POST /mx_openapi1/account_info ####

**Request:** 

|Param|required|data type|description|default|value range|
|:----    |:---|:----- |-----   | -----   | ----- |  
|access_key| true |  string |  AccessKey| | |
|ts | true |  int | timestamp | | |
|sign| true |  string |  signature| | ||

**Response:** 

|Param|data type|description|value range|
|:----    |:---|:----- |-----  | 
|code |int | response code   |   |
|info |string | error informations  |   |
|data |object|response data  |   |
|balances |array |balances  | | |

**Response:description**

``` 
{
	"code": 1,
		"info": "ok",
		"data": {
			"time": 1543226696,							#timestamp
				"estimate_BTC": 0.50110094,					#estimate BTC
				"estimate_USD": 1991.3337402628,			#estimate USD
				"estimate_CNY": 13740.202807828,			#estimate CNY
				"balances": [{
					"coin": "BTC",							#coin type
						"balance": "0.33201858",				#balance
						"position_margin": 0.16908236,			#position margin
						"order_margin": 0,						#order margin
						"total": 0.50110094,					#total balance
						"estimate_BTC": 0.50110094,				#estimate BTC
						"estimate_USD": 1991.3337402628,		#estimate USD
						"estimate_CNY": 13740.202807828			#estimate CNY
				}, {
					"coin": "ETH",
					"balance": "0.00000000",
					"position_margin": 0,
					"order_margin": 0,
					"total": 0,
					"estimate_BTC": 0,
					"estimate_USD": 0,
					"estimate_CNY": 0
				}]
		}
}
```

> Place Order( Long or Short)

#### POST /mx_openapi1/place_order ####

	**Request:** 

	|Param|required|data type|description|default|value range|
	|:----    |:---|:----- |-----   | -----   | ----- |  
	|access_key| true |  string |  AccessKey| ||
	|contract_id|true  |int |Contract ID | | |
	|price |true  |float| Price    | | |
	|amount |true  |int| Amount   | | |
	|leverage |true  |float| Leverage  | | |
	|direction |true  |int| Direction | |1:	Long；-1: Short|
	|type |true  |string | Order Type | |  limit: Limit Order; market: Market Order |
	|is_cross |true  |int |Is Cross | | 1: Cross，-1：Not Cross    |
	|ts | true |  int | timestamp | | |
	|sign| true |  string |  signature| | | |

	**Response:** 

	|Param|data type|description|value range|
	|:----    |:---|:----- |-----  | 
	|code |int | response code   |   |
	|info |string | error informations  |   |
	|data |object|response data  |   | |

	**response datadescription**

	``` 
{
	"code": 1,
		"info": "ok",
		"data": {
			"order_id": 123455		#order id
		}
}
```

> Cancel Order

#### POST /mx_openapi1/cancel_order ####

**Request:** 

|Param|required|data type|description|default|value range|
|:----    |:---|:----- |-----   | -----   | ----- |  
|access_key| true |  string |  AccessKey| ||
|order_id |是  |int |  order id | | |
|ts | true |  int | timestamp | | |
|sign| true |  string | signature| | | |

**Response:** 

|Param|data type|description|value range|
|:----    |:---|:----- |-----  | 
|code |int | response code   |   |
|info |string | error informations  |   |
|data |object|response data  |   | |

**Response:description**

``` 
{
	"code": 1,
		"info": "cancel order success",
		"data": {}
}
```

> Get My Active Orders

#### POST /mx_openapi1/active_orders ####

**Request:** 

|Param|required|data type|description|default|value range|
|:----    |:---|:----- |-----   | -----   | ----- |  
|access_key| true |  string |  AccessKey| ||
|contract_id|true  |int |Contract ID  | | |
|ts | true |  int | timestamp | | |
|sign| true |  string |  Signature| | | |

**Response:** 

|Param|data type|description|value range|
|:----    |:---|:----- |-----  | 
|code |int | response code   |   |
|info |string | error informations  |   |
|data |object|response data  |   |
|order_lists | array | Order List |  | |

**Response:description**

``` 
{
	"code": 1,
		"info": "ok",
		"data": {
			"order_lists": [{
				"order_id": "2088691",					#Order ID
					"contract_id": "1",						#Contract ID
					"amount": "1000",						#Order Amount
					"price": "3918.80000000",				#Order Price
					"type": "limit",						#Order Type: limit, market
					"leverage": "10",						#Leverage
					"direction": "-1",						#Direction 1: long -1: short
					"available": "1000",					#Order available
					"ctime": "1543228468",					#Order Time
					"order_status": "0",					#Order Status
					"liquidation_price": "0.00000000",		#Liquidation Price
					"is_cross": "-1",						#IS Cross，1: Cross,-1: Isolated
					"symbol": "BTC_USD"						#Contract Symbol
			}]
		}
}
```

> Get My Open Positions

#### POST /mx_openapi1/active_positions ####

**Request:** 

|Param|required|data type|description|default|value range|
|:----    |:---|:----- |-----   | -----   | ----- |  
|access_key| true |  string |  AccessKey| ||
|contract_id|false  |int |Contract ID  | | |
|ts | true |  int | timestamp | | |
|sign| true |  string |  Signature| | | |

**Response:** 

|Param|data type|description|value range|
|:----    |:---|:----- |-----  | 
|code |int | response code   |   |
|info |string | error informations  |   |
|data |object|response data  |   |
|position_lists | array | Position Lists |  | |

**Response:description**

``` 
{
	"code": 1,
		"info": "ok",
		"data": {
			"position_lists": [{
				"position_id": "32",						 #Position ID
					"contract_id": "1",							 #Contract ID
					"direction": "-1",							 #Direction, 1: long -1,short
					"amount": "8000",							 #Contract Amount
					"liquidation_price": "4665.63780374",		 #Liquidation Price
					"rlz_pnl": "0.00188912",					 #Realised PNL
					"unrlz_pnl": "0.00000000",					 #Unrealised PNL
					"margin": "0.19540420",						 #Positoin Margin
					"leverage": "10.00000000",					 #Leverage
					"price": "4222.40221239",					 #Open price
					"is_cross": "-1",							 #Is Cross 1: cross 2. isolate
					"symbol": "BTC_USD",						 #contract symbol
			}]
		}
}
```

> Get My History Orders

#### POST /mx_openapi1/myorders ####

**Request:** 

|Param|required|data type|description|default|value range|
|:----    |:---|:----- |-----   | -----   | ----- |  
|access_key| true |  string |  AccessKey| ||
|contract_id|true  |int |Contract ID  | | |
|page|false  |int |page | 1 | |
|page_size|false  |int |page_size  |20 | |
|ts | true |  int | timestamp | | |
|sign| true |  string | signature| | | |

**Response:** 

|Param|data type|description|value range|
|:----    |:---|:----- |-----  | 
|code |int | response code   |   |
|info |string | error informations  |   |
|data |object|response data  |   |
|orders_his |array|委托历史列表  |   | |


**Response:description**

``` 
{
	"code": 1,
		"info": "ok",
		"data": {
			"orders_his": [{
				"order_id": "2088691",					#Order ID
					"contract_id": "1",						#Contract ID
					"amount": "1000",						#Order Amount
					"price": "3918.80000000",				#Order Price
					"type": "limit",						#Order Type
					"leverage": "10",						#Leverage
					"direction": "-1",						#Direction 1:long -1:short
					"available": "1000",					#available
					"ctime": "1543228468",					#Order Time
					"order_status": "0",					#Order Status
					"liquidation_price": "0.00000000",		#Liquidation Price
					"is_cross": "-1",						#Is Cross，1:cross,-1:isolate
					"symbol": "BTC_USD"						#contract symbol
			}]
		}
}
```

> Get My Trades History

#### POST /mx_openapi1/mytrades ####

**Request:** 

|Param|required|data type|description|default|value range|
|:----    |:---|:----- |-----   | -----   | ----- |  
|access_key| true |  string |  AccessKey| ||
|contract_id|true  |int |Contract ID  | | |
|page|false  |int |page | 1 | |
|page_size|false  |int |page size  |20 | |
|ts | true |  int | timestamp | | |
|sign| true |  string |  Signature | | | |

**Response:** 

|Param|data type|description|value range|
|:----    |:---|:----- |-----  | 
|code |int | response code   |   |
|info |string | error informations  |   |
|data |object|response data  |   |
|trade_his |array|Trade Lists  |   | |

**Response:description**

``` 
{
	"code": 1,
		"info": "ok",
		"data": {
			"trades_his": [{
				"trade_id":"1234567",				  #Trade ID
					"contract_id": "1",					  #Contract ID
					"symbol": "BTC_USD",				  #Contract Symbol
					"price": "3918.80000000",			  #Trade Price
					"num": "1000",						  #Trade Num
					"ctime": 1543228746,				  #Trade Time
					"order_id": "2088691",				  #Order ID
					"trade_info": "sell",				  #Trade info buy/sell
					"leverage": "10",					  #Leverage
					"is_cross": "-1",					  #IS cross，1:cross,-1:isolate
			}]
		}
}
```

> Get My Closed Positions

#### POST /mx_openapi1/mypositions ####

**Request:** 

|Param|required|data type|description|default|value range|
|:----    |:---|:----- |-----   | -----   | ----- |  
|access_key| true |  string |  AccessKey| ||
|contract_id|true  |int |Contract ID  | | |
|page|false  |int |page | 1 | |
|page_size|false  |int |page_size |20 | |
|ts | true |  int | timestamp | | |
|sign| true |  string |  signature| | | |

**Response:** 

|Param|data type|description|value range|
|:----    |:---|:----- |-----  | 
|code |int | response code   |   |
|info |string | error informations  |   |
|data |object|response data  |   |
|position_his |array|My closed positions  |   | |


**Response:description**

``` 
{
	"code": 1,
		"info": "ok",
		"data": {
			"position_his": [{
				"position_id": "32",			#Position ID
					"contract_id": "1",				#Contract ID
					"rlz_pnl": "-0.00066059",		#Realized PNL
					"end_time": 1543058024,			#position end time
					"start_time": 1543056348,		#position start time
					"symbol": "BTC_USD"				#Contract Symbol
			}]
		}
}
```

> Get Order Match Results

#### POST /mx_openapi1/order_match_results ####

**Request:** 

|Param|required|data type|description|default|value range|
|:----    |:---|:----- |-----   | -----   | ----- |  
|access_key| true |  string |  AccessKey| ||
|order_id|true  |int |Order ID  | | |
|ts | true |  int | timestamp | | |
|sign| true |  string | signature| | | |

**Response:** 

|Param|data type|description|value range|
|:----    |:---|:----- |-----  | 
|code |int | response code   |   |
|info |string | error informations  |   |
|data |array|response data  |   | |

**Response:description**

``` 
{
	"code": 1,
		"info": "ok",
		"data": [{
			"trade_id":"1234567",				 #trade id
				"contract_id": "1",					 #contract ID
				"symbol": "BTC_USD",				 #contract symbol
				"price": "4269.20000000",			 #trade price
				"trade_num": "1400",	             #trade amount	
				"time": 1543058750,				     #trade time
				"order_id": "2044264",	             #Order Time
				"order_price": "4269.20000000",      #Order Price
				"type": "sell",					     #trade Type
				"leverage": "5",	                 #Leverage
				"is_cross": "-1"					 #Is cross，1: cross ,-1:ioslate
		}]
}
```




