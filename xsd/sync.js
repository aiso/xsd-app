'use strict';

const api = require('request.js')
const sync = require('../utils/sync.js')


//const stations = sync.setEntity('stations')

const base = sync.initEntity('base', ()=>{
    return api.get('xsd/base').then(data=>{
      return data.base
    })
})

const roles = sync.initEntity('roles', ()=>{
    return api.get('roles').then(data=>{
      return data.roles
    })
})

module.exports = {
	base,
	roles
}