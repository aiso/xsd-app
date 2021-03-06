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
	},
	postStatus(e){
		const postId = e.target.dataset.postId
		const status = e.target.dataset.status
		xsd.api.post('station/'+this.data.station+'/post/'+postId, {status}).then(data=>{
			const post = this.data.posts.find(p=>p.id==postId)
			post.status=data.post.status
			this.setData({posts:this.data.posts})
		})
	}
})