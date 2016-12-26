//index.js
//获取应用实例
const app = getApp()
const xsd = require('../../xsd/index')
const sync = require('../../utils/sync.js')

Page({
  data: {
    user: null,
    roles:null
  },
  onLoad(){
    xsd.api.get('xsd/base').then(data=>{
      sync.setEntity('base', data.base)
    })
  },
  onShow(){
      const user = app.globalData.user
      /*
      if(!!user){
        this.setData({user})
      }else{
        xsd.auth.login().then(user=>{
          this.setData({user})
        })
      }*/

      xsd.sync.roles.get().then(data=>{
        if(data.length > 0){
          const roles = {}
          roles.clients = data.filter(r=>r.role==10)
          roles.suppliers = data.filter(r=>r.role==20)
          roles.stations = data.filter(r=>r.role==30)
          this.setData({roles})
        }
      })
  },
  tokenScan(){
    xsd.token.scan()
  }
})
