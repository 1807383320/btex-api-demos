# BTEX 期货API #

BTEX期货交易，提供了强大的全套RESTful API支持，后续将继续开发出包括但不限于`websocket`等形式的API支持。

用户在用户中心申请API后，会得到一个`secret_key`和一个`access_key`，用于API接口调用中的身份识别和数据校验。 

**调用地址**

BTEX 测试网路 `https://testnet.btex.com/`

BTEX 正式网路 `https://api.btex.com/`

**签名算法**

为了对API用户进行身份识别和防止数据在发送过程中被篡改，我们使用了基于HMAC的签名算法，详细的签名算法请参见 [签名算法](https://github.com/btex-dev/btex-api-demos/blob/master/btex-mx-api-docs/sign-ZH_CN.md)。


