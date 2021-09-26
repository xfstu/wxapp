// pages/main/setting/index.js
const http=require('../../../../utils/http.js')
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async logonout(){
   await http.get('account/login-status/logout')
   Toast.success('退出登录！');
    setTimeout(() => {
      wx.reLaunch({
        url: '/pages/login/index',
      })
    }, 1000);
  }
})