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
	}

}