'use strict';

const app = getApp()
const Promise = require("../utils/promise").Promise
const api = require('request.js')
const sync = require('../utils/sync')

const AUTH_KEY = 'XSD_AUTH_KEY'

/*
const load = () => {
	return new Promise((resolve, reject)=>{
		wx.getStorage({
			key:AUTH_KEY,
			success:res=>{
				app.globalData.user = res.data
				resolve(res.data)
			}
		})
	})
}
*/
const store = (user) => {
	return new Promise((resolve, reject)=>{
		wx.setStorage({
			key:AUTH_KEY,
			data:user,
			success:res=>{
				app.globalData.user = user
				resolve()
			},
			fail:()=>{reject()}
		})
	})
}

const logout = () => {
	try {
	  wx.removeStorageSync(AUTH_KEY)
	  app.globalData.user = null
	} catch (e) {
	  // Do something when catch error
	}
}

const login = () => {
    return app.getUserInfo().then(userInfo=>{
      const postData = {code: app.globalData.accessCode, userInfo}

      postData.code = 'client-test1' //调试用户
      return api.post('wx/login', postData).then(data=>{
		  store(data.user).then(()=>{
		  	app.globalData.user = user
		  })
          return data.user
      })

    })
}

const check = () => {
	const user = app.globalData.user
	if(!!user)
		return user
	else{
		wx.navigateTo({url:'/pages/user/login'})
		return null
	}
}

module.exports = {
	//load,
	store,
	login,
	logout,
	check
}