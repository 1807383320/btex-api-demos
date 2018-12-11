 **安全认证**
 ------------
目前关于API申请和修改，请在“安全中心 - 申请API”页面进行相关操作。其中access_key为API访问密钥，secret_key为用户对请求进行签名的密钥（这两个秘钥，仅申请时可见）。

**重要提示：这两个密钥与账号安全紧密相关，无论何时都请勿向其它人透露。**

 **合法请求结构**
------------
基于安全考虑，除行情API 外的 API 请求都必须进行签名运算。一个合法的请求由以下几部分组成：

方法请求地址 即访问服务器地址：[https://testnet.btex.com](https://testnet.btex.com)，
后面跟上方法名，比如 [https://testnet.btex.com/mx_openapi1/active_orders](https://testnet.btex.com/mx_openapi1/active_orders).

API 访问密钥（access_Key）： 您申请的 API 中的access_Key。

签名方法（sign）： 用户计算签名的基于哈希的协议，此处使用 HmacSHA256。

时间戳（ts）： 您发出请求时间的时间戳  。在查询请求中包含此值有助于防止第三方截取您的请求。比如当前时间：2018-12-10 08:10:08，ts值为1544400608。

必选和可选参数：每个方法都有一组用于定义 API 调用的必需参数和可选参数。请在每个方法的说明中查看这些参数及其含义。 

签名：签名计算得出的值，用于确保签名有效和未被篡改。

**签名运算** 
------------
在通过 Internet 发送的过程中极有可能被篡改。为了确保请求未被更改，我们会要求用户在每个请求中带上签名（行情 API 除外），来校验参数或参数值在传输途中是否发生了更改。

计算签名所需的步骤：

1，规范要计算签名的请求 因为使用 HMAC 进行签名计算时，使用不同内容计算得到的结果会完全不同。所以在进行签名计算前，请先对请求进行规范化处理。下面以获取我的委托订单为例，进行说明。

```
https://btex.com/mx_openapi1/active_orders?access_key=abcdefgh&contract_id=123456&sign=abcdefgh&ts=1544400608
```

2，在进行签名运算时，按照ksort的顺序对参数名进行排序(例如，下面是请求参数的原始顺序）

```
access_key=abcdefgh
secret_key=abcdefgh
contract_id=123
ts=1544400608
```

这些参数会被排序为：

```
access_key=abcdefgh
contract_id=123456
secret_key=abcdefgh
ts=1544400608
```

然后，将各参数使用字符’&’连接，组成最终的要进行签名计算的字符串(`tPreStr`)如下：

`access_key=abcdefgh&contract_id=123456&secret_key=abcdefgh&ts=1544400608`

3，计算签名，将上边计算的字符串(`tPreStr`)传入加密哈希函数： 
```
hash_hmac('sha256', $tPreStr, SECRET_KEY, TRUE);
```

4, 得到上边所说的签名结果，并进行Base64编码，最终得到`sign`。

5，将上述值`sign`作为参数`sign`的取值添加到 API 请求中即可。
