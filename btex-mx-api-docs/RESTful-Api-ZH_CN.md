 
> 获取合约交易市场列表

#### GET /mx_data/contracts ####

**请求参数：** 

|参数名|必选|类型|说明|默认值|取值范围|
|:----    |:---|:----- |-----   | -----   | ----- |  
|contract_id |false |int |合约ID   |  |  | |  

 **响应数据** 

|参数名|类型|说明|取值范围|
|:----|:---|:----- |-----  | 
|code |int | 请求结果  |   |
|info |string | 提示信息  |   |
|data |array|请求数据  |   | |

 **响应数据说明**

``` 
 {
	"code": 1,
	"info": "ok",
	"data": [{
		"contract_id": "1",		   		#合约id
		"symbol": "BTC",				#合约标识
		"settle_anchor": "BTC",	   			#结算单位
		"quote_anchor": "USD",	    			#计价单位
		"contract_anchor": "USD",   			#合约单位
		"contract_value": "1.00000000",         	#单张合约价值
		"type": "1",					#合约类型，1:永续合约, 2:非永续合约
		"expiry": "0000-00-00 00:00:00",        	#合约交割时间(非永续合约)
		"max_leverage": "100",	                	#最大杠杆倍数
		"maintance_margin": "0.00500000",       	#维持保证金比例
		"maker_fee": "-0.00050000",  			#make费率
		"taker_fee": "0.00150000",   			#taker费率
		"settle_fee": "0.00000000",  			#交割费率
		"price_dec": "2",	      			#价格浮点数显示位数
		"anchor_dec": "8",		       		#结算单位浮点数显示位数
		"status": "1",			        	#合约状态，1:交易中,0:暂停交易,-1:永久停止
		"isreverse": "1",		        	#1:反向合约，-1:正向合约
		"allow_cross": "1",		      		#是否可以全仓，1:可以，-1:不可以
		"allow_leverages": "1,5,10,25,50,100",		#杠杆倍数
		"max_order_num": "20",				#最多可挂未成交委单数量
		"max_amount": 50000,				#单个委单最多数量限制
		"min_amount": 10,				#单个委单最少数量限制
		"max_position_amount": 50000,			#最大持仓数量
	}]
}
```

> 获取某个合约交易最新行情
 
#### GET /mx_data/tickers #####

**请求参数：** 

|参数名|必选|类型|说明|默认值|取值范围|
|:----    |:---|:----- |-----   | -----   | ----- |  
|contract_id |false |int |合约ID   |  |  | |  

 **响应数据** 

|参数名|类型|说明|取值范围|
|:----|:---|:----- |-----| 
|code |int | 请求结果  |   |
|info |string | 提示信息   |   |
|data |array|请求数据  |   |   |

 **响应数据说明**

``` 
{
	"code": 1,
	"info": "ok",
	"data": [{
		"contract_id": "1",				#合约ID
		"pair": "BTC_USD",				#合约市场
		"min": "3475.09",				#24H最低价
		"max": "4270.00",				#24H最高价
		"latest": "3902.07",				#最新价格
		"change_24h": "0.0684",				#24H涨跌比例
		"amount": "27259252",				#成交量
		"volumn": "7067.43",				#成交额
		"open_interest": "12345",			#持仓量
		"index_price": "3890.36",			#指数价格
		"fair_price": "3890.38",			#公平价格
		"next_funding_rate": "0.00125000",		#预测资金费率
	}]
}
```

> 获取某个合约交易的市场深度

#### GET /mx_data/orderbook ####

**请求参数：** 

|参数名|必选|类型|说明|默认值|取值范围|
|:----    |:---|:----- |-----   | -----   | ----- |  
|contract_id |true |int |合约ID   |  |  |
|depth |false |int |深度类型   |10  | 5, 10, 15, 20, 30, 50  | |

 **响应数据** 

|参数名|类型|说明|取值范围|
|:----    |:---|:----- |-----  | 
|code |int | 请求结果   |   |
|info |string | 提示信息    |   |
|data |object|请求数据  |   |
|bids |array|多单(买单) |   | 
|asks |array|空单(卖单) |   |   |

 **响应数据说明**

``` 
{
	"code": 1,
	"info": "ok",
	"data": {
		"bids": [{
			"price": 3911.02,		#买单价格
			"amount": 7182			#买单数量
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
			"price": 3913.64,		#卖单价格
			"amount": 7592			#卖单数量
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

> 获取某个合约交易历史

#### GET /mx_data/trades ####

**请求参数：** 

|参数名|必选|类型|说明|默认值|取值范围|
|:----    |:---|:----- |-----   | -----   | ----- |  
|contract_id |true |int |合约ID   |  |     |
|page_size |false|int |获取数据的数量   |  20 |1-300  | |

 **响应数据** 

|参数名|类型|说明|取值范围|
|:----    |:---|:----- |-----  | 
|code |int | 请求结果  |   |
|info |string | 提示信息   |   |
|data |object|请求数据  |  |
|lists |array|请求数据 |   |   |

 **响应数据说明**

``` 
{
	"code": 1,
	"info": "ok",
	"data": {
		"lists": [{
			"trade_id": "1234567",		#成交id
			"time": 1543224980,		#成交时间
			"price": "3898.73000000",	#成交价格
			"num": "4116",			#成交数量
			"type": "sell"			#成交类型
		}]
	}
}
```

> 获取某个合约交易k线

#### GET /mx_data/k_data ####

**请求参数：** 

|参数名|必选|类型|说明|默认值|取值范围|
|:----    |:---|:----- |-----   | -----   | ----- |  
|contract_id |true |int |合约ID   |  |     |
|k_type |false| string| K线类型  |  5m | 5m, 15m, 30m, 1h, 4h, 8h, 1d|
|k_amount |false| int| 获取数据的数量  | 100 | 1-3000   |

 **响应数据** 

|参数名|类型|说明|取值范围|
|:----    |:---|:----- |-----  | 
|code |int | 请求结果  |   |
|info |string | 提示信息  |   |
|data |object|请求数据  |   |
|lists |array|请求数据 |   |  |

 **响应数据说明**

``` 
{
    "code": 1,
    "info": "ok",
    "data": {
        "lists": [
            [
                "1543219200000",		#时间戳
                "3976.81000000",		#开盘价
                "3976.86000000",		#最高价
                "3876.78000000",		#最低价
                "3903.01000000",		#收盘价
                "1078399",			#交易量
                "4251467748.36"			#成交额
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
        
    }
}
#数据描述(从左至右)：时间戳，开盘价，最高价，最低价，收盘价，交易量，成交额
```

-----

> 获取合约账户信息
 
#### POST /mx_openapi1/account_info ####

**请求参数：** 

|参数名|必选|类型|说明|默认值|取值范围|
|:----    |:---|:----- |-----   | -----   | ----- |  
|access_key| true |  string |  AccessKey，用户申请| | |
|ts | true |  int | 当前时间戳 | | |
|sign| true |  string |  签名，详见签名信息| | ||

 **响应数据** 

|参数名|类型|说明|取值范围|
|:----    |:---|:----- |-----  | 
|code |int | 请求结果  |   |
|info |string | 提示信息   |   |
|data |object|请求数据  |   |
|balances |array |余额列表  | | |

 **响应数据说明**

``` 
 {
	"code": 1,
	"info": "ok",
	"data": {
		"time": 1543226696,					#响应时间
		"estimate_BTC": "0.50110094",				#账户总估值(BTC)
		"estimate_USD": "1991.3337402628",			#账户总估值(USD)
		"estimate_CNY": "13740.202807828",			#账户总估值(CNY)
		"balances": [{
			"coin": "BTC",					#币种
			"balance": "0.33201858",			#可用余额
			"position_margin": "0.16908236",		#仓位保证金
			"order_margin": "0.00000000",			#委托保证金
			"total": "0.50110094",				#该币种的总余额
			"estimate_BTC": "0.50110094",			#该币种的总估值(BTC)
			"estimate_USD": "1991.3337402628",		#该币种的总估值(USD)
			"estimate_CNY": "13740.202807828"		#该币种的总估值(CNY)
		}, {
			"coin": "ETH",
			"balance": "0.00000000",
			"position_margin": "0.00000000",
			"order_margin": "0.00000000",
			"total": "0.00000000",
			"estimate_BTC": "0.00000000",
			"estimate_USD": "0.00",
			"estimate_CNY": "0.00"
		}]
	}
}
```

> 下单(做多/做空)

#### POST /mx_openapi1/place_order ####

**请求参数：** 

|参数名|必选|类型|说明|默认值|取值范围|
|:----    |:---|:----- |-----   | -----   | ----- |  
|access_key| true |  string |  AccessKey，用户申请| ||
|contract_id|true  |int |合约ID  | | |
|price |true  |float| 价格    | | |
|amount |true  |int| 合约张数   | | |
|leverage |true  |float| 杠杆倍数  | | |
|direction |true  |int| 委托方向 | |1:	做多；-1: 做空|
|type |true  |string | 委托类型 | |  limit: 限价单; market: 市价单 |
|is_cross |true  |int |是否全仓 | | 1: 全仓，-1：非全仓    |
|ts | true |  int | 当前时间戳 | | |
|sign| true |  string |  签名，详见签名信息| | | |

 **响应数据** 

|参数名|类型|说明|取值范围|
|:----    |:---|:----- |-----  | 
|code |int | 请求结果  |   |
|info |string | 提示信息  |   |
|data |object|请求数据  |   | |

 **请求数据说明**

``` 
 {
	"code": 1,
	"info": "ok",
	"data": {
		"order_id": 123455		#下单成功后，委托单id
	}
}
```

> 取消委托

#### POST /mx_openapi1/cancel_order ####

**请求参数：** 

|参数名|必选|类型|说明|默认值|取值范围|
|:----    |:---|:----- |-----   | -----   | ----- |  
|access_key| true |  string |  AccessKey，用户申请| ||
|order_id |是  |int |  委托单id | | |
|ts | true |  int | 当前时间戳 | | |
|sign| true |  string |  签名，详见签名信息| | | |

 **响应数据** 

|参数名|类型|说明|取值范围|
|:----    |:---|:----- |-----  | 
|code |int | 请求结果  |   |
|info |string | 提示信息  |   |
|data |object|请求数据  |   | |

 **响应数据说明**

``` 
{
	"code": 1,
	"info": "cancel order success",
	"data": {}
}
```

> 获取我的活动委托

#### POST /mx_openapi1/active_orders ####

**请求参数：** 

|参数名|必选|类型|说明|默认值|取值范围|
|:----    |:---|:----- |-----   | -----   | ----- |  
|access_key| true |  string |  AccessKey，用户申请| ||
|contract_id|true  |int |合约ID  | | |
|ts | true |  int | 当前时间戳 | | |
|sign| true |  string |  签名，详见签名信息| | | |

 **响应数据** 

|参数名|类型|说明|取值范围|
|:----    |:---|:----- |-----  | 
|code |int | 请求结果  |   |
|info |string | 提示信息  |   |
|data |object|请求数据  |   |
|order_lists | array | 委托列表 |  | |

 **响应数据说明**

``` 
{
	"code": 1,
	"info": "ok",
	"data": {
		"order_lists": [{
			"order_id": "2088691",					#委托单ID
			"contract_id": "1",					#合约ID
			"amount": "1000",					#委托张数
			"price": "3918.80000000",				#委托价格
			"type": "limit",					#委托类型，limit:限价委托，maket:市价委托。
			"leverage": "10",					#杠杆倍数
			"direction": "-1",					#委托方向，1:做多，-1:做空。
			"order_status": "0",					#委托状态，0:未完成，1:已完成，-1:已取消。
			"is_cross": "-1",					#是否全仓，1:是,-1:不是
			"available": "1000",					#剩余委托张数
			"time": 1543228468,					#委托时间
			"pair": "BTC_USD"					#合约市场
		}]
	}
}
```

> 获取当前未平仓位

#### POST /mx_openapi1/active_positions ####

**请求参数：** 

|参数名|必选|类型|说明|默认值|取值范围|
|:----    |:---|:----- |-----   | -----   | ----- |  
|access_key| true |  string |  AccessKey，用户申请| ||
|contract_id|false  |int |合约ID  | | |
|ts | true |  int | 当前时间戳 | | |
|sign| true |  string |  签名，详见签名信息| | | |

 **响应数据** 

|参数名|类型|说明|取值范围|
|:----    |:---|:----- |-----  | 
|code |int | 请求结果  |   |
|info |string | 提示信息  |   |
|data |object|请求数据  |   |
|position_lists | array | 仓位列表 |  | |

 **响应数据说明**

``` 
 {
	"code": 1,
	"info": "ok",
	"data": {
		"position_lists": [{
			"position_id": "32",						 #仓位ID
			"contract_id": "1",						 #合约ID
			"price": "4222.40221239",					 #开仓均价
			"direction": "-1",						 #仓位方向，1:多仓，-1:空仓。
			"amount": "8000",						 #仓位的合约张数
			"liquidation_price": "4665.63780374",		 		 #强平价格
			"rlz_pnl": "0.00188912",					 #已实现盈亏
			"unrlz_pnl": "0.00000000",					 #未实现盈亏
			"margin": "0.19540420",						 #仓位保证金
			"leverage": "10.00000000",					 #杠杆倍数
			"is_cross": "-1",						 #是否全仓, 1:是，-1:不是
			"pair": "BTC_USD",						 #合约标识
		}]
	}
}
```

> 获取我的委托历史

#### POST /mx_openapi1/myorders ####

**请求参数：** 

|参数名|必选|类型|说明|默认值|取值范围|
|:----    |:---|:----- |-----   | -----   | ----- |  
|access_key| true |  string |  AccessKey，用户申请| ||
|contract_id|true  |int |合约ID  | | |
|page|false  |int |分页，页数  | 1 | |
|page_size|false  |int |分页，每页数量  |20 | |
|ts | true |  int | 当前时间戳 | | |
|sign| true |  string |  签名，详见签名信息| | | |

 **响应数据** 

|参数名|类型|说明|取值范围|
|:----    |:---|:----- |-----  | 
|code |int | 请求结果  |   |
|info |string | 提示信息  |   |
|data |object|请求数据  |   |
|orders_his |array|委托历史列表  |   | |


 **响应数据说明**

``` 
{
	"code": 1,
	"info": "ok",
	"data": {
		"orders_his": [{
			"order_id": "2088691",					#委托单ID
			"contract_id": "1",					#合约ID
			"amount": "1000",					#委托张数
			"price": "3918.80000000",				#委托价格
			"type": "limit",					#委托类型，limit:限价委托，maket:市价委托。
			"leverage": "10",					#杠杆倍数
			"direction": "-1",					#委托方向，1:做多，-1:做空。
			"order_status": "0",					#委托状态，0:未完成，1:已完成，-1:已取消。
			"is_cross": "-1",					#是否全仓，1:是,-1:不是。
			"available": "1000",					#剩余委托张数
			"time": 1543228468,					#委托时间
			"pair": "BTC_USD"					#合约市场
		}]
	}
}
```

> 获取我的交易历史

#### POST /mx_openapi1/mytrades ####

**请求参数：** 

|参数名|必选|类型|说明|默认值|取值范围|
|:----    |:---|:----- |-----   | -----   | ----- |  
|access_key| true |  string |  AccessKey，用户申请| ||
|contract_id|true  |int |合约ID  | | |
|page|false  |int |分页，页数  | 1 | |
|page_size|false  |int |分页，每页数量  |20 | |
|ts | true |  int | 当前时间戳 | | |
|sign| true |  string |  签名，详见签名信息| | | |

 **响应数据** 

|参数名|类型|说明|取值范围|
|:----    |:---|:----- |-----  | 
|code |int | 请求结果  |   |
|info |string | 提示信息  |   |
|data |object|请求数据  |   |
|trade_his |array|成交历史列表  |   | |

 **响应数据说明**

``` 
{
	"code": 1,
	"info": "ok",
	"data": {
		"trades_his": [{
			"trade_id":"1234567",    			  #成交id
			"contract_id": "1",				  #合约ID
			"pair": "BTC_USD",				  #合约市场
			"price": "3918.80",			  	  #成交价格
			"num": "1000",					  #成交数量
			"order_id": "2088691",				  #委托单ID
			"type": "sell",				          #交易类型
			"trade_fee": "0.00013149",			  #交易手续费
			"leverage": "10",				  #杠杆倍数
			"is_cross": "-1",				  #是否全仓，1:是,-1:不是。
			"time": 1543228746,				  #成交时间
		}]
	}
}
```

> 获取我的已平仓位

#### POST /mx_openapi1/mypositions ####

**请求参数：** 

|参数名|必选|类型|说明|默认值|取值范围|
|:----    |:---|:----- |-----   | -----   | ----- |  
|access_key| true |  string |  AccessKey，用户申请| ||
|contract_id|true  |int |合约ID  | | |
|page|false  |int |分页，页数  | 1 | |
|page_size|false  |int |分页，每页数量  |20 | |
|ts | true |  int | 当前时间戳 | | |
|sign| true |  string |  签名，详见签名信息| | | |

 **响应数据** 

|参数名|类型|说明|取值范围|
|:----    |:---|:----- |-----  | 
|code |int | 请求结果  |   |
|info |string | 提示信息  |   |
|data |object|请求数据  |   |
|position_his |array|已平仓列表  |   | |


 **响应数据说明**

``` 
 {
	"code": 1,
	"info": "ok",
	"data": {
		"position_his": [{
			"position_id": "32",			#仓位ID
			"contract_id": "1",			#合约ID
			"rlz_pnl": "-0.00066059",		#已实现盈亏
			"end_time": 1543058024,			#交易完成时间
			"start_time": 1543056348,		#交易开始时间
			"pair": "BTC_USD"			#合约市场
		}]
	}
}
```

> 获取某个委托的成交明细

#### POST /mx_openapi1/order_match_results ####

**请求参数：** 

|参数名|必选|类型|说明|默认值|取值范围|
|:----    |:---|:----- |-----   | -----   | ----- |  
|access_key| true |  string |  AccessKey，用户申请| ||
|order_id|true  |int |委托单ID  | | |
|ts | true |  int | 当前时间戳 | | |
|sign| true |  string |  签名，详见签名信息| | | |

 **响应数据** 

|参数名|类型|说明|取值范围|
|:----    |:---|:----- |-----  | 
|code |int | 请求结果  |   |
|info |string | 提示信息  |   |
|data |array|请求数据  |   | |

 **响应数据说明**

``` 
{
	"code": 1,
	"info": "ok",
	"data": [{
	   	"trade_id":"1234567",         		 #成交id
		"contract_id": "1",	         	 #合约ID
		"pair": "BTC_USD",           		 #合约市场
		"price": "4269.20",       	         #成交价格
		"trade_num": "1400",	                 #成交数量		
		"time": 1543058750,		       	 #成交时间
		"order_id": "2044264",	                 #委托单ID
		"order_price": "4269.20",                #委托价格
		"type": "sell",	       			 #交易类型
		"trade_fee": "0.00001288",	       	 #交易手续费
		"leverage": "5",	                 #杠杆倍数
		"is_cross": "-1"	   		 #是否全仓，1:是,-1:不是。
	}]
}
```

> 获取某个委托的状态

#### POST /mx_openapi1/get_order_batch ####

**请求参数：** 

|参数名|必选|类型|说明|默认值|取值范围|
|:----    |:---|:----- |-----   | -----   | ----- |  
|access_key| true |  string |  AccessKey，用户申请| ||
|order_id|true  |string |委托单ID,支持多个ID批量查询(目前最多50个)，以英文逗号(,)隔开。| | |
|ts | true |  int | 当前时间戳 | | |
|sign| true |  string |  签名，详见签名信息| | | |

 **响应数据** 

|参数名|类型|说明|取值范围|
|:----    |:---|:----- |-----  | 
|code |int | 请求结果  |   |
|info |string | 提示信息  |   |
|data |array|请求数据  |   | |

 **响应数据说明**

``` 
{
	"code": 1,
	"info": "ok",
	"data": [{
	   	"order_id":"1234567",         		 #委托ID
		"contract_id": "1",	         	 #合约ID
		"pair": "BTC_USD",           		 #合约市场
		"amount": "1000",	                 #委托数量	
		"price": "4269.20",       	         #委托价格
		"type": "limit",	       		 #委托类型，limit:限价委托，maket:市价委托。
		"leverage": "5",	                 #杠杆倍数
		"direction": "1",	       	 	 #委托方向，1:做多，-1:做空。
		"order_status": "1",	                 #委托状态，0:未完成，1:已完成，-1:已取消。
		"available": "0",                        #剩余委托张数
		"time": 1547522291,		       	 #委托时间
	}]
}
```


