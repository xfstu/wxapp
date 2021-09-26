//Page Object
const http=require('../../utils/http.js')
import Toast from '@vant/weapp/toast/toast';
Page({
  data: {
    session:wx.getStorageSync('session'),
    img:"",
    loginType:'account',
  },
  //options(Object)
  onLoad: function(options){
    this.getImg()
    this.check()
  },
  async test(){
    const data= await api.post('/test')
    console.log(data)
  },
  getImg(){
    const http=require("../../utils/http.js").host
    this.setData({
      img:http+ "tools/imgcode?"+Math.random()
    })
  },
  /**
   * 登录校验
   */
  async check(){
    //页面存在session
    if(this.data.session){
      wx.showLoading({
        title: '登录检测中',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 1000)
      //从后端校验
      const respones=await http.get('account/login/check-login/clinet')
      if(respones.status){
        wx.hideLoading()
        setTimeout(() => {
          wx.switchTab({
            url:'/pages/index/index'
          })
        }, 1000);
      }else{
        wx.showModal({
          title: '提示',
          showCancel:false,
          content: respones.message
        })        
      }
    }

  },
  async login(e){
    const jsen=require('../../utils/endecode.js')
    const postData={
      account:jsen.encode(e.detail.value.account),
      password:jsen.encode(e.detail.value.password),
      captcha:e.detail.value.captcha
    }
    const that=this
    wx.request({
      url: http.host+'account/login/account/client',
      header:{
        sn:http.sn()
      },
      method:'POST',
      data:postData,
      success(respones){
        const data=respones.data
        if(data.status){
          Toast.success(data.message);
          wx.setStorageSync('session', data.data.SessionID)
          wx.setStorageSync('header-img', data.data.userimg)
          wx.setStorageSync('alias', data.data.alias)
          wx.setStorageSync('wxBind', data.data.wxBind)
          setTimeout(() => {
            wx.switchTab({
              url:'/pages/index/index'
            })
          }, 2000);
        }else{
          wx.showToast({
            title: data.message,
            icon: 'none',
            duration: 2000,
            mask:true
          })
          that.setData({
            img:http.host+"tools/imgcode?"+Math.random()
          })
        }
      },
      fail(){
        wx.showToast({
          title: '网络错误！',
          icon: 'error',
          duration: 2000,
          mask:true
        })
      }
    })
    
  },
  wxlogin(){
    wx.login({
      timeout: 3000,
      success(respones){
        wx.request({
          url: http.host+'account/login/wx/auth',
          method:'POST',
          data:{code:respones.code},
          header:{
            sn:http.sn()
          },
          success(respones){
            if(respones.data.status){
              wx.showToast({
                title:respones.data.message,
                icon: 'success',
                duration: 2000,
                mask:true
              })
              wx.setStorageSync('session', respones.data.data.SessionID)
              wx.setStorageSync('header-img', respones.data.data.userimg)
              wx.setStorageSync('alias', respones.data.data.alias)
              wx.setStorageSync('wxBind', respones.data.data.wxBind)
              setTimeout(() => {
                wx.switchTab({
                  url:'/pages/index/index'
                })
              }, 3000);
            }else{
              wx.showToast({
                title:respones.data.message,
                icon: 'error',
                duration: 2000,
                mask:true
              })
            }
          },
          fail(e){
            wx.showToast({
              title:'Server Error',
              icon: 'error',
              duration: 2000,
              mask:true
            })
          }
        })
      },
      fail(e){

      }
    })
  },
  selectLoginType(e){
    this.setData({loginType:e.currentTarget.dataset.type})
  }
});