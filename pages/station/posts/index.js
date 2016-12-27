"use strict";
const xsd = require('../../../xsd/index')
const timeago = require('../../../utils/timeago')

Page({
	data:{
		posts:[]
	},
	onLoad(options){
		this.setData({station:options.station})
		wx.showToast({
		  title: '载入中...',
		  icon: 'loading',
		  duration: 2000
		})
		xsd.api.get('station/'+options.station+'/posts').then(data=>{
			var timeagoInstance = new timeago();
			const posts = data.posts.map(post=>{
				post.timeago = timeagoInstance.format(post.utime)
			})
			this.setData({posts:data.posts})
			wx.hideToast()
		}).catch(err=>{
			wx.hideToast()
		})
	},
	removeAgent(e){
        wx.showModal({
          title: '提示',
          content: '确实要取消该商品代理？',
          success:(res)=>{
		    if (res.confirm) {
				const postId = e.currentTarget.dataset.postId
				xsd.api.post('station/'+this.data.station+'/post/'+postId, {status:2}).then(data=>{
					const posts = this.data.posts.filter(p=>p.id!=postId)
					this.setData({posts})
				})
		    }
          }
        })		
	}	
})