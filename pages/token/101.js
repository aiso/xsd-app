"use strict";
const xsd = require('../../xsd/index')
const string = require('../../utils/string')
const util = require('../../utils/util')

Page({
	data:{
		info:{cls:'c-text', info:'正在获取TOKEN信息...'},
		station:null,
		token:null
	},
	onLoad(options){
		this.setData({token:options.token})
		xsd.api.post('client/station', {token:options.token,action:'view'}).then(data=>{
			const station = Object.assign({}, data.station)
			station.contacts = (new string.StringArray(station.contacts)).array()

			this.setData({station, info:null})
		}).catch(err=>{
			this.setData({info:{cls:'c-red', info:err}})
		})
	},
	openMap(){
		const location = util.decodeGeohash(this.data.station.geohash)
		wx.openLocation({
	        latitude: location.lat,
	        longitude: location.lng,
	        scale:15,
	        name:this.data.station.name,
	        address:this.data.station.station
		})		
	},
	postToken(){
		xsd.api.post('client/station', {token:this.data.token,action:'commit'}).then(data=>{
			xsd.sync.roles.dirty()
			wx.navigateBack()
		}).catch(err=>{
			this.setData({info:{cls:'c-red', info:err}})
		})
	}
})