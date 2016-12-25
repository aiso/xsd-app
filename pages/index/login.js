"use strict";
const xsd = require('../../xsd/index')
const app = getApp()

Page({
  data: {
    userInfo: null
  },
  onShow(){
    xsd.auth.login().then(user=>{
      wx.navigateBack()
    })
  }
})
