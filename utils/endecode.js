var privateKey = 'MIICXAIBAAKBgQDdGSOA1bqgwLmKwZI01cELgP8a0uZloS7pBOXxLLvw212Ia329OpGCqNFcQl1rcFAlSaXR5ztofl24BxCRBS5b92ACVjFrO7Yl1IyJGenmhW6hiSNuBVjEs00d4TlF3fRa/mY+2p3+vWH9IX3EvO46hIJvcgEOuQz1yrVRTgUSYQIDAQABAoGAdPzZOVFdx7NSOaZE62nzFFg0I4hWWo4X2To7RQqLg10/N3DQ/nBgEAeth6ih77hk3+YBNHiqiZbblgU+8c0RAqKaQ/hypWArMZFyi5fHo+kLLH4YJcwihhrwGkwN31lcQKqvRlbwEq+ZvFes+QepL16AQZ1RI9tB9GIRwpODI9UCQQD0tz+4olJjZI+9AYJmE153NWy9jMOnc0j0pwPLdoxTaJxiTkoJJbDJnx3tyVsbH/T06Omg/h6cGu0JkPNsmsFHAkEA50sYZNP0QlVWqFN+z94IxxX896vtem1VMp4eqTNzhk+yIGTuva6Y+YYV40sLq9+vxiiUC6bc+ZPjj8ogb0cjFwJAd1LzS0A7FCPwwqR9xPAk29O9FiARNxFLvZ/Che9kNTeJKZYrG5K5RVbE7TGFrxBCDTmU0d+XZV7rvgJj78z1+QJBAITy1n/GkcW7VgeFjwQfJb6CNhmLWwMfa3SgDRHHQGV40/Po8I5ZmRb86wHutjPCbUAjPQ4BiU1wo8KYNdKg+lsCQB4LXSwE6NXzjSpInJVWWWn6m/g7RH1jfdZMtbMjMQqJPDFW8tCAKFO560ZQaNV/1QTPBMkJOnkcwaAfg/6M6xk='

var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDdGSOA1bqgwLmKwZI01cELgP8a0uZloS7pBOXxLLvw212Ia329OpGCqNFcQl1rcFAlSaXR5ztofl24BxCRBS5b92ACVjFrO7Yl1IyJGenmhW6hiSNuBVjEs00d4TlF3fRa/mY+2p3+vWH9IX3EvO46hIJvcgEOuQz1yrVRTgUSYQIDAQAB'
var Encrypt = require('./jsencrypt.min.js');

//加密
function encode(code){
  let encryptor = new Encrypt.JSEncrypt();
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(code) // 对需要加密的数据进行加密
}

//解密
function decode(code){
const decryptor = new Encrypt.JSEncrypt();
decryptor.setPrivateKey(privateKey)
return decryptor.decrypt(code)
}

//md5
function md5(string){
  const md5=require('./md5.min.js')
  return md5.md5(string)
}

module.exports = {
  encode:encode,
  decode:decode,
  md5:md5
}