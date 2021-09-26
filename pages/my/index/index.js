const http = require("../../../utils/http");
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from '@vant/weapp/toast/toast';

// pages/my/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{
      headerimg:wx.getStorageSync('header-img'),
      alias:wx.getStorageSync('alias')
    },
    wxcode:'',
    wxBind:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 登录校验
     */
    wx.request({
      url: 'account/wx/login-check',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  scan() {
    wx.scanCode({
      success: (res) => {
        wx.setStorageSync('scan', res.result)
        wx.navigateTo({
          url:'/pages/my/pages/scancode/index',
        })
      },
      fail: (e) => {
        
      }
    })
  },
  checkBind(){
    const that=this
    const msg=wx.getStorageSync('wxBind')=='true'?'解绑':'绑定'
    Dialog.confirm({
      title: '提示',
      message: '是否与当前帐号进行'+msg+'？',
    }).then(async () => {
      //微信绑定
      if(wx.getStorageSync('wxBind')=='false'){
        wx.login({
          timeout: 3000,
          success(e){
            wx.request({
              url: http.host+'account/wx/bind?type=lock',
              method:'POST',
              data:{usercode:e.code},
              header:{
                SessionID:wx.getStorageSync('session'),
              },
              success(){
                Toast.success(msg+'成功！');
                wx.setStorageSync('wxBind', 'true')
                that.setData({
                  wxBind:'已绑定'
                })
              }
            })
          },
          fail(){
            Toast.error('微信授权失败！');
          }
        })
      }else{
        console.log('解绑');
        const respones=await http.post('account/wx/bind?type=unlock');
        if(respones.status){
          wx.setStorageSync('wxBind', 'false')
          that.setData({
            wxBind:'未绑定'
          })
          Toast.success(msg+'成功！');
        }else{
          Toast.error(msg+'失败！');
        }
      }
    }).catch(() => {
      Toast('操作取消！');
      // on cancel
    });
  },
  onShow(){
    const alias='userinfo.alias'
    const headerImg='userinfo.headerimg'
    this.setData({
      wxBind:wx.getStorageSync('wxBind')=='true'?'已绑定':'未绑定',
      [alias]:wx.getStorageSync('alias'),
      [headerImg]:wx.getStorageSync('header-img')
    })
  },
  goUser(){
    wx.navigateTo({
      url: '/pages/my/pages/user/index',
    })
  },
  //大图查看头像
  preview(event) {
    let currentUrl = [{url:event.currentTarget.dataset.src}]
    wx.previewMedia({
      sources: currentUrl, // 当前显示图片的http链接
    })
  }
})