const a=require("./index")
const http=require("../http")
function sn(){
  const t = Date.parse(new Date()) / 1000
  return a.ea(t.toString(), 'XE~Vr3*VAweb59h~')
}
function get(){
  const k=http.get('/tools/system/info/init?sn=',{sn:sn()},'初始化中...')
  return k
}

function init(){
  return get()
}
function check(){
  return init()
}
module.exports = {check}