const http = require("../../../../utils/http")

// pages/main/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerimg:wx.getStorageSync('header-img'),
    alias:'',
    email:'',
    info:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  save(){


    //头像保存到服务器
    wx.removeStorageSync('tempsrc')//清除缓存
    wx.uploadFile({
      url: http.host+'upload', //仅为示例，非真实的接口地址
      filePath: wx.getStorageSync('tempsrc'),
      name: 'file',
      success (res){
        const data = JSON.parse(res.data)
        console.log(data.data.url)
        that.setData({
          headerimg:data.data.url
        })
        wx.setStorageSync('header-img', data.data.url)
      }
    })
  },
  updateImg(){
    const that=this
    wx.chooseImage({
      success (res) {
        const tempFilePaths = res.tempFilePaths
        //当用户没有点击保存时，使用临时本地地址
        that.setData({
          headerimg:tempFilePaths[0]
        })
        wx.setStorageSync('tempsrc', tempFilePaths[0])
      }
    })
  },
  preview(event) {
    let currentUrl = [{url:event.currentTarget.dataset.src}]
    wx.previewMedia({
      sources: currentUrl, // 当前显示图片的http链接
    })
  },
  onShow(){
    const headerImg='headerimg'
    this.setData({
      [headerImg]:wx.getStorageSync('header-img'),
      alias:wx.getStorageSync('alias'),
    })
  },
})