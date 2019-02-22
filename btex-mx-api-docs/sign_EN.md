**Security**
------------
**Important Note: Do not reveal your 'AccessKey' and 'SecretKey' to anyone. They are as important as your password.**

You can get secret_key and access_key on btex.com. Please visit "Security >> Apply for API". https://btex.com/home/my_api

**Why signature is required!**
------------
Web service requests are sent across the Internet and are vulnerable to tampering. For security reasons, Huobi requires a signature as part of every request.

Request domain：[https://api.btex.com](https://api.btex.com),

Request URL:
[https://api.btex.com/mx_openapi1/active_orders](https://api.btex.com/mx_openapi1/active_orders).

API access_key (access_key)：your access_Key

Sign Method (sign): HmacSHA256

Timestamp (ts):  UTC timestmap: such as 1544400608.

**How to Generate a Signature**
------------

How to Generate a Signature: 

1，create request url

```
POST: https://api.btex.com/mx_openapi1/active_orders

Parameters: access_key=abcdefgh&contract_id=123456&sign=abcdefgh&ts=1544400608
```

2，ksort the parameters

```
access_key=abcdefgh
secret_key=abcdefgh
contract_id=123
ts=1544400608
```

ksort results: 

```
access_key=abcdefgh
contract_id=123456
secret_key=abcdefgh
ts=1544400608
```

use & to build the string (`tPreStr`):

`access_key=abcdefgh&contract_id=123456&secret_key=abcdefgh&ts=1544400608`

3.Use the string (`tPreStr`) to get HmacSHA256 signature(`hmac256_sign`)  ： 
```
hash_hmac('sha256', $tPreStr, SECRET_KEY, TRUE);
```

4, base64 the signature (`hmac256_sign`) to `sign`。

5，Add the `sign` as a parameter to the POST parameters。
```
access_key=abcdefgh&contract_id=123456&secret_key=abcdefgh&ts=1544400608&sign=signxxxxxxxxxx
	 ```
