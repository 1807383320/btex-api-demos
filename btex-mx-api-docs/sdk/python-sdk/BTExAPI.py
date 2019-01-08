
import requests
import hmac
import hashlib
import base64
import time
import urllib
from urllib import parse

nowtime = int(time.time())

class BTEX:

    def __init__(self, base_url, access_key, secret_key):
        self.__base_url = base_url
        self.__access_key = access_key
        self.__secret_key = secret_key

    '''
        ======================
        合约行情 API
        ======================
    '''

    '''
        获取交易市场合约列表
    '''

    def contracts(self):
        response = requests.get(self.__base_url + '/mx_data/contracts')
        return response.json()


    '''
        获取某合约的最新信息

        contract_id     合约ID
    '''

    def tickers(self,contract_id):
        param = {'contract_id': contract_id}
        response = requests.get(self.__base_url + '/mx_data/tickers', param)
        return response.json()

    '''
        获取某合约市场深度

        depth       默认 10   
    '''

    def orderbook(self,contract_id, depth=10):
        param = {'contract_id': contract_id,
                 'depth': depth
                 }
        response = requests.get(self.__base_url + '/mx_data/orderbook', param)
        return response.json()

    '''
        获取某个合约的交易历史

        page_size       默认20条
    '''

    def trades(self,contract_id, page_size=20):
        param = {'contract_id': contract_id,
                 'page_size': page_size
                 }
        response = requests.get(self.__base_url + '/mx_data/trades', param)
        return response.json()

    '''
        获取某个合约K线

        k_type          取值范围 5m, 15m, 30m, 1h, 4h, 8h, 1d, 默认5m
        k_amount        数量范围 1～3000  默认 100   
    '''

    def k_data(self,contract_id, k_type='5m', k_amount=100):
        param = {'contract_id': contract_id,
                 'k_type': k_type,
                 'k_amount': k_amount
                 }
        response = requests.get(self.__base_url + '/mx_data/k_data', param)
        return response.json()

    '''
        ======================
        合约交易 API
        ======================
    '''

    '''
        获取我的余额
    '''

    def account_info(self):
        param = {'ts':nowtime}
        param['sign'] = self.build_sign(param)
        response = requests.post(self.__base_url + '/mx_openapi1/account_info', param)
        return response.json()

    '''
        合约下单

        contract_id 合约ID
        price       下单价格
        amount      下单数量
        leverage    杠杆
        direction   1 做多，-1 做空
        type        limit 限价单，market 市价单
        is_cross    1 全仓，-1 逐仓
    '''

    def place_order(self,contract_id, price, amount, leverage, direction, type, is_cross):
        param = {'contract_id': contract_id,
                 'price': price,
                 'amount': amount,
                 'leverage': leverage,
                 'direction': direction,
                 'type': type,
                 'is_cross': is_cross,
                 'ts': nowtime
                 }
        param['sign'] = self.build_sign(param)
        response = requests.post(self.__base_url + '/mx_openapi1/place_order', param)
        return response.json()

    '''
        获取我的当前仓位

        contract_id 合约ID
    '''

    def active_positions(self,contract_id):
        param = {'contract_id': contract_id,
                 'ts': nowtime
                 }
        param['sign'] = self.build_sign(param)
        response = requests.post(self.__base_url + '/mx_openapi1/active_positions', param)
        return response.json()

    '''
        获取我的活动委托

        contract_id 合约ID
    '''

    def active_orders(self,contract_id):
        param = {'contract_id': contract_id,
                 'ts': nowtime
                 }
        param['sign'] = self.build_sign(param)
        response = requests.post(self.__base_url + '/mx_openapi1/active_orders', param)
        return response.json()

    '''
        取消委托单

        order_id    委托单ID
    '''

    def cancel_order(self,order_id):
        param = {'order_id': order_id,
                 'ts': nowtime
                 }
        param['sign'] = self.build_sign(param)
        response = requests.post(self.__base_url + '/mx_openapi1/cancel_order', param)
        return response.json()

    '''
        获取我的委托历史

        contract_id 合约ID
        page        分页，页数，起始值为 1
        page_size   每页数量，默认20
    '''

    def myorders(self,contract_id, page=1, page_size=20):
        param = {'contract_id': contract_id,
                 'page': page,
                 'page_size': page_size,
                 'ts': nowtime
                 }
        param['sign'] = self.build_sign(param)
        response = requests.post(self.__base_url + '/mx_openapi1/myorders', param)
        return response.json()

    '''
        获取我的交易历史

        contract_id 合约ID
        page        分页，页数，起始值为 1
        page_size   每页数量，默认20
    '''

    def mytrades(self,contract_id, page=1, page_size=20):
        param = {'contract_id': contract_id,
                 'page': page,
                 'page_size': page_size,
                 'ts': nowtime
                 }
        param['sign'] = self.build_sign(param)
        response = requests.post(self.__base_url + '/mx_openapi1/mytrades', param)
        return response.json()

    '''
        获取我的已平仓仓位

        contract_id     合约ID
        page            分页，页数，起始值为 1
        page_size       每页数量，默认20
    '''

    def mypositions(self,contract_id, page=1, page_size=20):
        param = {'contract_id': contract_id,
                 'page': page,
                 'page_size': page_size,
                 'ts': nowtime
                 }
        param['sign'] = self.build_sign(param)
        response = requests.post(self.__base_url + '/mx_openapi1/mypositions', param)
        return response.json()

    '''
        获取某个委托的成交明细

        order_id       委托单ID
    '''

    def order_match_results(self,order_id):
        param = {'order_id': order_id,
                 'ts': nowtime
                 }
        param['sign'] = self.build_sign(param)
        response = requests.post(self.__base_url + '/mx_openapi1/order_match_results', param)
        return response.json()

    # 签名
    def build_sign(self,param):
        param['access_key'] = self.__access_key
        param['secret_key'] = self.__secret_key
        sorted_params = sorted(param.items(), key=lambda d: d[0], reverse=False)
        encode_params = urllib.parse.urlencode(sorted_params).encode(encoding='UTF8')
        secretKey = self.__secret_key.encode(encoding='UTF8')
        digest = hmac.new(secretKey, encode_params, digestmod=hashlib.sha256).digest()
        signature = base64.b64encode(digest)
        return signature




