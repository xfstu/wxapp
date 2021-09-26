// pages/scancode/index.js
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast'
import http, { host, sn } from '../../../../utils/http';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  login(){
    wx.request({
      url: host+'account/login/qrcode/set?requestid='+wx.getStorageSync('scan'),
      header:{
        SessionID:wx.getStorageSync('session'),
        sn:sn()
      },
      method:'GET',
      success(respones){
        if(respones.data.status){
          Toast.success('授权成功！');
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/index/index'
            })
          }, 1500);
        }else{
          Dialog.alert({
            message: '授权失败！',
          }).then(() => {
            wx.switchTab({
              url: '/pages/index/index'
            })
          });
        }
      },
      fail(e){

      }
    })
    wx.removeStorageSync('scan')
  },
  onLoad(){
    wx.request({
      url:host+'account/login/qrcode/set?requestid='+ wx.getStorageSync('scan')+'&status=set',
      header:{
        SessionID:wx.getStorageSync('session'),
        sn:http.sn()
      },
      method:'GET'
    })
  }
})