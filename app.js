//app.js
const util = require('utils/util')
const Promise = require('utils/promise').Promise

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    //var logs = wx.getStorageSync('logs') || []
    //logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs)

    util.wxFix()

    const that = this
    wx.getStorage({
      key:'XSD_AUTH_KEY',
      success:function(res){
        that.globalData.user = res.data
      }
    })

  },
  getUserInfo(){
    //console.log(this.globalData)
    if(!!this.globalData.userInfo) 
      return Promise.resolve(this.globalData.userInfo)

    const that = this
    return new Promise((resolve, reject) => {
      that.login().then(()=>{
        wx.getUserInfo({
          success: function (res) {
            //console.log(res.userInfo)
            that.globalData.userInfo = res.userInfo
            resolve(res.userInfo)
          }
        })
      })
    })
  },
  login(){
    if(!!this.globalData.accessCode) 
      return Promise.resolve(this.globalData.accessCode)

    const that = this
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res)=>{
          that.globalData.accessCode = res.code
          resolve(res.code)
        }
      })
    })
  },
  globalData:{
    env:'dev',
    userInfo:null
  }
})