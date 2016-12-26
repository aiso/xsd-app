'use strict';
const xsd = require('../../xsd/index')
const util = require('../../utils/util')

Page({
  data: {
  	location:null,
    markers:null,
    scale:15,
    controls:[{
      id: 1,
      iconPath: '/images/icons/zoom-in_green.png',
      position: {
        left: 300,
        top: 5,
        width: 30,
        height: 30
      },
      clickable: true      
    },
    {
      id: 2,
      iconPath: '/images/icons/zoom-out_green.png',
      position: {
        left: 340,
        top: 5,
        width: 30,
        height: 30
      },
      clickable: true      
    }    
    ]
  },
  onLoad(options){
    wx.setNavigationBarTitle({
      title: options.title
    })
    const location = util.decodeGeohash(options.geohash)
    const markers = [{
        latitude: location.lat,
        longitude: location.lng
      }]
    this.setData({location, markers})
  },
  controltap(e){
    if(e.controlId == 1)
      this.setData({scale:this.data.scale+1>18?18:this.data.scale+1})
    else if(e.controlId == 2)
      this.setData({scale:this.data.scale-1<5?5:this.data.scale-1})
  }
})