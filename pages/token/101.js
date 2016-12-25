"use strict";

Page({
	data:{
		station:null,
		token:''
	},
	onLoad(options){
		this.setData({token:options.token})
	}
})