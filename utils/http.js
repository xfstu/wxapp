const endecode=require('./endecode.js')
const pk="MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ3FxLZ1uNAHqtJRJ0zdYHUkdzLKmzjGb5gQxRVEhEFMudR9TdCxjs922EjyspxARDE2W2uUIqI69m7B1w2xqnECAwEAAQ=="
const edLib=require("./ed/index")
//接口请求统一封装
const API_BASE_URL = "http://xfstu.com/api/"
//const API_BASE_URL = "http://192.168.1.4/api/"
//const API_BASE_URL="https://api.xfstu.top/api/"

/**
 * 签名
 */
function sn(){
   const a=Date.parse(new Date())/1000;
   const code=edLib.er(a.toString()+'-'+'xw2',pk);
   return encodeURI(code)
}
const request=function(method,url,data,loadingMeg){
   const loading=loadingMeg||false
   if (loading) {
      wx.showLoading({
        mask: true,
        title: loadingMeg||'加载中...'
      })
    }
   let _url = API_BASE_URL + url
   return new Promise((resolve,reject)=>{//返回一个新的Promise实例对象
      //开始执行异步任务
      wx.request({
         url: _url,
         method: method,
         data:data,
         header:{
            'SessionID': wx.getStorageSync('sessionid'),
            'sn':sn()
         },
         success:function(res){
             wx.hideLoading()
            if(res.statusCode==500){
               wx.showToast({
                  title: '服务器错误！',
                  icon: 'error',
                  duration: 3000
               })
               return resolve(res.data)//异步任务执行成功;
            }else if(res.statusCode==403||res.statusCode==401){
               wx.removeStorageSync('session')
               wx.showToast({
                  title: '无权限操作！',
                  icon: 'error',
                  duration: 3000
               })
               setTimeout(()=>{
                  wx.redirectTo({
                    url: '/pages/login/index',
                  })
               },3500)
            }else if(res.statusCode==404){
               wx.showToast({
                  title: '找不到资源！',
                  icon: 'error',
                  duration: 3000
               })
               return resolve(res.data)
            }else if(res.statusCode!==202){
               wx.showToast({
                  title: '发生异常错误',
                  icon: 'error',
                  duration: 3000
               })
            }
            return resolve(res.data)//异步任务执行成功
          },
          fail:function(err){
            wx.hideLoading()
            wx.showToast({
               title: '网络请求超时！',
               icon: 'error',
               duration: 3000
             })  
            reject(err)//异步任务失败
          }
      })
   })
}

/**
 * 
 * @param {String} url 请求地址，可直接使用test?a=b
 * @param {JSON|null} data 携带数据,如果是null则啥也不带
 * @param {String} loadingMeg 此值存在则在页面显示加载文字，否则不显示加载
 */
const get=(url,data,loadingMeg)=>{
   return request('GET',url,data,loadingMeg)
}

/**
 * 
 * @param {String} url 请求地址，可直接使用test?a=b
 * @param {JSON|Null} data 需携带的数据，不需则留null
 * @param {*} loadingMeg 加载的文字，默认不显示
 */
const post=(url,data,loadingMeg)=>{
   return request('POST',url,data,loadingMeg)
}
module.exports = {
   get,
   post,
   host:API_BASE_URL,
   sn,
}