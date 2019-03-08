<?php
define("MARKET_API_URL","http://api.btex.com/mx_data");
define("TRADE_API_URL","http://api.btex.com/mx_openapi1");
class BtexMxAPI{
        private $access_key = "Your public key";
        private $secret_key = "Your private key";
        
        public function __construct($access_key='',$secret_key=''){
            $this->access_key = $access_key;
            $this->secret_key = $secret_key;
        }
        
        // get all contracts or single contract
        function contracts($contract_id){
            $url = MARKET_API_URL."/contracts?contract_id=".$contract_id; 
            $tResult = $this->httpRequest($url,'');
            return json_decode($tResult,1);
        }

        // get contracts ticker
        function tickers($contract_id){
            $url = MARKET_API_URL."/tickers?contract_id=".$contract_id; 
            $tResult = $this->httpRequest($url,'');
            return json_decode($tResult,1);
        }


        // get single contract depth
        function orderbook($contract_id,$depth=10){
            $contract_id = (int)$contract_id;
            if($contract_id < 0){
                return false;
            }
            $depth = (int)$depth;
            $url = MARKET_API_URL."/orderbook/?contract_id=".$contract_id."&depth=".$depth; 
            $tResult = $this->httpRequest($url,'');
            return json_decode($tResult,1);
        }

        // get single market trade history
        function trades($contract_id,$page_size=20){
            $contract_id = (int)$contract_id;
            if($contract_id < 0){
                return false;
            }
            $page_size = (int)$page_size;
            $url = MARKET_API_URL."/trades/?contract_id=".$contract_id."&page_size=".$page_size; 
            $tResult = $this->httpRequest($url,'');
            return json_decode($tResult,1);
        }

        /**
        * get k line data 
        * @params   k_type: k line type, 5m,15m,30m,1h,2h,4h,8h,1d
        *           k_amount: k line data amount
        **/
        function k_data($contract_id,$k_type='5m',$k_amount=300){
            $contract_id = (int)$contract_id;
            if($contract_id < 0){
                return false;
            }
            $url = MARKET_API_URL."/k_data/?contract_id=".$contract_id."&k_type=".$k_type."&k_amount=".$k_amount; 
            $tResult = $this->httpRequest($url,'');
            return json_decode($tResult,1);
        }
        
        //get my account info 
        function account_info(){
                $tParams = array();
                $tParams['access_key'] = $this->access_key;
                $tParams['ts'] = time();
                $tParams['sign'] = $this->createSign($tParams);
                $tResult = $this->httpRequest(TRADE_API_URL.'/account_info', $tParams);
                return json_decode($tResult,1);
        }

        /**
        * place order
        * @params   contract_id: Contract id
        *           price: Order price
        *           amount: Order amount
        *           leverage: Number of levers
        *           direction: 1:buy,-1:sell
        *           type: Order type, limit or market
        *           is_cross : 1:all positions,-1:partial position
        **/
        function place_order($contract_id,$price,$amount,$leverage,$direction,$type,$is_cross){
                if($contract_id <= 0 || $price <= 0 || $amount <= 0){
                    return false;
                }
                $tParams = array();
                $tParams['access_key'] = $this->access_key;
                $tParams['contract_id'] = (int)$contract_id;
                $tParams['price'] = (float)abs($price);
                $tParams['amount'] = (int)abs($amount);
                $tParams['leverage'] = (float)$leverage;
                $tParams['direction'] = (int)$direction;
                $tParams['type'] = trim($type);
                $tParams['is_cross'] = (int)$is_cross;
                $tParams['ts'] = time();
                $tParams['sign'] = $this->createSign($tParams);
                $tResult = $this->httpRequest(TRADE_API_URL.'/place_order', $tParams);
                return json_decode($tResult,1);
        }
        
        //cancel orders 
        function cancel_order($order_id){
                if(!is_numeric($order_id) || $order_id <=0){
                    return false;
                }
                $tParams = array();
                $tParams['access_key'] = $this->access_key;
                $tParams['order_id'] = (int)$order_id;
                $tParams['ts'] = time();
                $tParams['sign'] = $this->createSign($tParams);
                $tResult = $this->httpRequest(TRADE_API_URL.'/cancel_order', $tParams);
                return json_decode($tResult,1);
        }
        
        //get my active orders
        function active_orders($contract_id){
                if(!is_numeric($contract_id) || $contract_id <=0){
                    return false;
                }
                $tParams = array();
                $tParams['access_key'] = $this->access_key;
                $tParams['contract_id'] = (int)$contract_id;
                $tParams['ts'] = time();
                $tParams['sign'] = $this->createSign($tParams);
                $tResult = $this->httpRequest(TRADE_API_URL.'/active_orders', $tParams);
                return json_decode($tResult,1);
        }

        //get my active positions
        function active_positions($contract_id=''){
                $tParams = array();
                $tParams['access_key'] = $this->access_key;
                $tParams['contract_id'] = (int)$contract_id;
                $tParams['ts'] = time();
                $tParams['sign'] = $this->createSign($tParams);
                $tResult = $this->httpRequest(TRADE_API_URL.'/active_positions', $tParams);
                return json_decode($tResult,1);
        }

        //get my orders history 
        function myorders($contract_id){
                if(!is_numeric($contract_id) || $contract_id <=0){
                    return false;
                }
                $tParams = array();
                $tParams['access_key'] = $this->access_key;
                $tParams['contract_id'] = (int)$contract_id;
                $tParams['ts'] = time();
                $tParams['sign'] = $this->createSign($tParams);
                $tResult = $this->httpRequest(TRADE_API_URL.'/myorders', $tParams);
                return json_decode($tResult,1);
        }
	
        //get my trade history
        function mytrades($contract_id){
                if(!is_numeric($contract_id) || $contract_id <=0){
                    return false;
                }
                $tParams = array();
                $tParams['access_key'] = $this->access_key;
                $tParams['contract_id'] = (int)$contract_id;
                $tParams['ts'] = time();
                $tParams['sign'] = $this->createSign($tParams);
                $tResult = $this->httpRequest(TRADE_API_URL.'/mytrades', $tParams);
                return json_decode($tResult,1);
        }
        
        //get my position history
        function mypositions($contract_id){
                if(!is_numeric($contract_id) || $contract_id <=0){
                    return false;
                }
                $tParams = array();
                $tParams['access_key'] = $this->access_key;
                $tParams['contract_id'] = (int)$contract_id;
                $tParams['ts'] = time();
                $tParams['sign'] = $this->createSign($tParams);
                $tResult = $this->httpRequest(TRADE_API_URL.'/mypositions', $tParams);
                return json_decode($tResult,1);
        }

        //get the order match results
        function order_match_results($order_id){
                if(!is_numeric($order_id) || $order_id <=0){
                    return false;
                }
                $tParams = array();
                $tParams['access_key'] = $this->access_key;
                $tParams['order_id'] = (int)$order_id;
                $tParams['ts'] = time();
                $tParams['sign'] = $this->createSign($tParams);
                $tResult = $this->httpRequest(TRADE_API_URL.'/order_match_results', $tParams);
                return json_decode($tResult,1);
        }
	
	//get the order status
	function get_order_batch($order_id){
		if(strlen(trim($order_id)) < 1){
		    return false;	
		}
		$tParams = array();
		$tParams['access_key'] = $this->access_key;
		$tParams['order_id'] = $order_id;
		$tParams['ts'] = time();
		$tParams['sign'] = $this->createSign($tParams);
		$tResult = $this->httpRequest(TRADE_API_URL.'/get_order_batch', $tParams);
		return json_decode($tResult,1);
	}

        function httpRequest($pUrl, $pData){
                $tCh = curl_init();
                if($pData){
                        is_array($pData) && $pData = http_build_query($pData);
                        curl_setopt($tCh, CURLOPT_POST, true);
                        curl_setopt($tCh, CURLOPT_POSTFIELDS, $pData);
                }
                curl_setopt($tCh, CURLOPT_HTTPHEADER, array("Content-type: application/x-www-form-urlencoded"));
                curl_setopt($tCh, CURLOPT_URL, $pUrl);
                curl_setopt($tCh, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($tCh, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($tCh, CURLOPT_TIMEOUT, 10);
                $tResult = curl_exec($tCh);
                curl_close($tCh);
                return $tResult;
        }
        
        //sign the data
	function createSign($pParams = array()) {
		$pParams['secret_key'] = $this->secret_key;
            	ksort($pParams);
            	$tPreSign = http_build_query($pParams);
		$signature = hash_hmac('sha256', $tPreSign, $this->secret_key, true);
		return base64_encode($signature);
	}
}
/**
* Test Demo
*
*/
    $access_key = '';
    $secret_key = '';
    $sdk = new BtexMxAPI($access_key,$secret_key);
    $contract_id = 1;
    //get all contracts or single contract
    //$contracts = $sdk->contracts($contract_id);
    //var_dump($contracts);die;
    
    //get contracts ticker
    //$tickers = $sdk->tickers($contract_id);
    //var_dump($tickers);
    
    //get contract depth 
    //$depth = $sdk->orderbook($contract_id,5);
    //var_dump($depth);
     
    //trades history
    //$trades = $sdk->trades($contract_id,10);
    //var_dump($trades);
    
    //get k line data
    //$k_data = $sdk->k_data($contract_id,'15m',20);
    //var_dump($k_data);
    
    //get account info
    //$info = $sdk->account_info();
    //var_dump($info);
    
    //place order
    //$res = $sdk->place_order($contract_id,4171.55,1000,5,1,'limit',-1);
    //var_dump($res);die;
    
    //cancel order 
    //$res1 = $sdk->cancel_order(2282792);
    //var_dump($res1);
   
    //get my active orders
    //$res = $sdk->active_orders($contract_id);
    //var_dump($res);
    
    //get my active positions
    //$res = $sdk->active_positions($contract_id);
    //var_dump($res);

    //get my orders history
    //$res = $sdk->myorders($contract_id);
    //var_dump($res);
    
    //get my trade history
    //$res = $sdk->mytrades($contract_id);
    //var_dump($res);
    
    //get my position history
    //$res = $sdk->mypositions($contract_id);
    //var_dump($res);
    
    //get my order match results
    //$order_id = '2237140';
    //$res = $sdk->order_match_results($order_id);
    //var_dump($res);

    //get orders status
    //$order_id = '12345,12456,12789';
    //$res = $sdk->get_order_batch($order_id);
    //var_dump($res);
   
?>
