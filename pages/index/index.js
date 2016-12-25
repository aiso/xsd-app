//index.js
//获取应用实例
const app = getApp()
const xsd = require('../../xsd/index')
const sync = require('../../utils/sync.js')

Page({
  data: {
    user: null
  },
  onLoad(){
    xsd.api.get('xsd/base').then(data=>{
      sync.setEntity('base', data.base)
    })
  },
  onShow(){
      const user = app.globalData.user
      if(!!user){
        this.setData({user})
      }else{
        xsd.auth.login().then(user=>{
          this.setData({user})
        })
      }
  },
  tokenScan(){
    xsd.token.scan()
  }
})
