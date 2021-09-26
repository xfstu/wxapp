//Page Object
const api=require('../../utils/http.js')
Page({
  data: {
    session:wx.getStorageSync('session')
  },
  //options(Object)
  onLoad: function(options){
  },
  async test(){
    
  },
  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  onPullDownRefresh: function(){

  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  },
  async login(e){
    const http=require('../../utils/http.js')
    console.log(http.host)
  },
  userinfo(e){
    console.log(e)
  },
});