module.exports = {	
	mapObject: function(object, callback) {
		return Object.keys(object).map(function (key, idx) {
			return callback(key, object[key], idx);
		});
	},
	getStatusName: function(status){
		
		var _status = status.toLowerCase();

		for(var s in AppConfig.STATUS_MAPPING){
			if(s.toLowerCase() == _status) return AppConfig.STATUS_MAPPING[s]
		}
		
		return 'Please provide status mapping in config file for ' + status;
	},
	t: function(s,d){
		for(var p in d)
		s=s.replace(new RegExp('{'+p+'}','g'), d[p]);
		return s;
	},
	isSpeech: function(status){

		return status.toLowerCase() == 'speech'
	},
	assign: function(){

		if (!Object.assign) {
		  Object.defineProperty(Object, 'assign', {
		    enumerable: false,
		    configurable: true,
		    writable: true,
		    value: function(target) {
		      'use strict';
		      if (target === undefined || target === null) {
		        throw new TypeError('Cannot convert first argument to object');
		      }

		      var to = Object(target);
		      for (var i = 1; i < arguments.length; i++) {
		        var nextSource = arguments[i];
		        if (nextSource === undefined || nextSource === null) {
		          continue;
		        }
		        nextSource = Object(nextSource);

		        var keysArray = Object.keys(nextSource);
		        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
		          var nextKey = keysArray[nextIndex];
		          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
		          if (desc !== undefined && desc.enumerable) {
		            to[nextKey] = nextSource[nextKey];
		          }
		        }
		      }
		      return to;
		    }
		  });
		}

		return Object.assign(arguments)		
	},
	debounce: function(func, wait, immediate) {
		var timeout, args, context, timestamp, result;

		var now = Date.now || function() {
			return new Date().getTime();
	  	}

		var later = function() {
			var last = now() - timestamp;

			if (last < wait && last >= 0) {
				timeout = setTimeout(later, wait - last);
			} else {
				timeout = null;
				if (!immediate) {
					result = func.apply(context, args);
					if (!timeout) context = args = null;
				}
			}
		};

		return function() {
			context = this;
			args = arguments;
			timestamp = now();
			var callNow = immediate && !timeout;
			if (!timeout) timeout = setTimeout(later, wait);
			if (callNow) {
				result = func.apply(context, args);
				context = args = null;
			}

			return result;
		};
	},
	getUserUrl: function(method, userType){

		var url = '';

		if(method == 'new'){
			switch(userType){
				case 'user':
					url = AppConfig.API.USERS.CREATE_NEW_USER;
					break;
				case 'mp':
					url = AppConfig.API.USERS.CREATE_NEW_MP;
					break;
				case 'hod':
					url = AppConfig.API.USERS.CREATE_NEW_HOD;
					break;
				default:
					url = AppConfig.API.USERS.CREATE_NEW_LIASON_OFFICER;
					break;
			}
		};

		return AppConfig.API.BASE_URL + url;
	},

}