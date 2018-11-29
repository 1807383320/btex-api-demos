 **签名信息** 

在通过 Internet 发送的过程中极有可能被篡改。为了确保请求未被更改，我们会要求用户在每个请求中带上签名（行情 API 除外），来校验参数或参数值在传输途中是否发生了更改。

计算签名所需的步骤：

1，规范要计算签名的请求 因为使用 HMAC 进行签名计算时，使用不同内容计算得到的结果会完全不同。所以在进行签名计算前，请先对请求进行规范化处理。下面以获取我的委托订单为例，进行说明。

```
https://btex.com/mx_openapi1/active_orders?access_key=abcdefgh&contract_id=123456&sign=abcdefgh
```

2，在进行签名运算时，按照ksort的顺序对参数名进行排序(例如，下面是请求参数的原始顺序）

```
access_key=abcdefgh
secret_key=abcdefgh
contract_id=123
```

这些参数会被排序为：

```
access_key=abcdefgh
contract_id=123456
secret_key=abcdefgh
```

然后，将各参数使用字符’&’连接，组成最终的要进行签名计算的字符串(`tPreStr`)如下：

`access_key=abcdefgh&contract_id=123456&secret_key=abcdefgh`

3，计算签名，将上边计算的字符串(`tPreStr`)传入加密哈希函数： 
```
hash_hmac('sha256', $tPreStr, SECRET_KEY, TRUE);
```

4, 得到上边所说的签名结果，并进行Base64编码，最终得到`sign`。

5，将上述值`sign`作为参数`sign`的取值添加到 API 请求中即可。