'use strict';
const util = require('../../utils/util')
const Promise = require('../../utils/promise').Promise
const xsd = require('../../xsd/index')

Page({
  data:{
  	uuid:'生成UUID'
  },
  test(e){
  	console.log(e.target.dataset.sid)
  },
  cleanStorage(){
  	try {
  	    wx.clearStorageSync()
  	} catch(e) {
  	  // Do something when catch error
  	}
  },
  createUUID(){
  	this.setData({uuid:util.uuid.createUUID().toLowerCase()})
  },
  testPromise(){
    console.log('start')
    const p = new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve('done')
      }, 1000)
    })

    p.then(data=>{
      console.log(data)
    })
  },
  requestTest(){
    xsd.api.get('test').then(data=>{
        wx.showModal({
          title: 'TEST',
          content: data.test.info,
          showCancel:false
        })
    })
  }
})
