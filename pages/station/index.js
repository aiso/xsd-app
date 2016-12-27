"use strict";
const xsd = require('../../xsd/index')

Page({
	data:{
		station:null
	},
	onLoad(options){
		xsd.api.get('station/'+options.id+'/index').then(data=>{
			this.setData({station:data.station})
		})
	}
})