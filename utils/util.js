const geohash = require('./geohash')
const UUID = require('./uuid')

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function decodeGeohash(hash){
    const latlng = geohash.decode(hash)
    return {lng:latlng.longitude[1], lat:latlng.latitude[1]}
}

const wxFix = () => {
  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
      value: function(predicate) {
       'use strict';
       if (this == null) {
         throw new TypeError('Array.prototype.find called on null or undefined');
       }
       if (typeof predicate !== 'function') {
         throw new TypeError('predicate must be a function');
       }
       var list = Object(this);
       var length = list.length >>> 0;
       var thisArg = arguments[1];
       var value;

       for (var i = 0; i < length; i++) {
         value = list[i];
         if (predicate.call(thisArg, value, i, list)) {
           return value;
         }
       }
       return undefined;
      }
    });
  }

  if (typeof Object.assign != 'function') {
    Object.assign = function (target, varArgs) { // .length of function is 2
      'use strict';
      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    };
  }
}


module.exports = {
  formatTime,
  decodeGeohash,
  uuid:new UUID(),
  wxFix
}
