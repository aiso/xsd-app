'use strict';

const api = require('request.js')
const sync = require('../utils/sync.js')


const stations = sync.initEntity('stations', ()=>{
    return api.get('supplier/stations').then(data=>{
      return data.stations
    })
})

//const stations = sync.setEntity('stations')

const base = sync.initEntity('base', ()=>{
    return api.get('xsd/base').then(data=>{
      return data.base
    })
})

module.exports = {
	stations,
	base
}