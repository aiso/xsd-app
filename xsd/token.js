'use strict';
const app = getApp()
const Promise = require('../utils/promise').Promise

const scanCode = () => {
	return new Promise((resolve, reject) => {
		if(app.globalData.env == 'dev')
			resolve('XSD-102-42R4TB3B')
		else{
		    wx.scanCode({
		      success: (res) => {
		      	resolve(res.result)
		      },
		      fail: (err) => {
		      	reject(err)
		      }
		    })
		}
    })
}

const parseCode = code => {
	const arr = code.toUpperCase().split('-')
	if(arr.length == 3 && arr[0] == 'XSD'){
		const url = '/pages/token/'+arr[1]+'?token='+arr[2]
		wx.navigateTo({url, fail:()=>{
			wx.showModal({
				title:'错误提示',
				content:'无效的TOKEN类型',
				showCancel:false
			})
		}})
	}
}


const scan = () => {
	scanCode().then(code=>{
		parseCode(code)
	})
}

module.exports = {
	scanCode,
	parseCode,
	scan
}