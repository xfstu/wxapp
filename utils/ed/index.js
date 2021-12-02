const CryptoJS=require("crypto-js")
const Encrypt=require("./jsencrypt.min")
function ea(s,k){
  const ks = k || 'XE~Vr3*VAweb59h~'
  const key = CryptoJS.enc.Utf8.parse(ks)
  const srcs = CryptoJS.enc.Utf8.parse(s)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.toString()
}

function da(s,k){
  const ks = k || 'XE~Vr3*VAweb59h~'
  const key = CryptoJS.enc.Utf8.parse(ks)
  const decrypt = CryptoJS.AES.decrypt(s, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

function er(s,k){
  const encryptor = new Encrypt.JSEncrypt();
  encryptor.setPublicKey(k) 
  return encryptor.encrypt(s)
}

function dr(s,k){
  const decryptor = new Encrypt.JSEncrypt();
  decryptor.setPrivateKey(k)
  return decryptor.decrypt(s)
}

function eb(s){
  const k=CryptoJS.enc.Utf8.parse(s)
  return CryptoJS.enc.Base64.stringify(k)
}

function db(s){
  const k=CryptoJS.enc.Base64.parse(s)
  return k.toString(CryptoJS.enc.Utf8)
}

function md5(s){
  return CryptoJS.MD5(s).toString()
}
module.exports={
  ea,
  da,
  er,
  dr,
  eb,
  db,
  md5
}