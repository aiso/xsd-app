"use strict";
const xsd = require('../../../xsd/index')
const timeago = require('../../../utils/timeago')

Page({
	data:{
		posts:[]
	},
	onLoad(options){
		wx.showToast({
		  title: '载入中...',
		  icon: 'loading',
		  duration: 2000
		})
		xsd.api.get('station/'+options.station+'/posts/request').then(data=>{
			var timeagoInstance = new timeago();
			const posts = data.posts.map(post=>{
				post.timeago = timeagoInstance.format(post.utime)
			})
			this.setData({posts:data.posts})
			wx.hideToast()
		}).catch(err=>{
			wx.hideToast()
		})
	}
})