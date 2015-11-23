var utilities = {	
	mapObject: function(object, callback) {
		return Object.keys(object).map(function (key, idx) {
			return callback(key, object[key], idx);
		});
	},
	filterStatus: function(statuses, currentStatus){

		var index = 0;

		for(var i = 0; i < AppConfig.STATUS_MAPPING.length; i++){
			if(AppConfig.STATUS_MAPPING[i].name.toLowerCase() == currentStatus.toLowerCase()){
				index = i;
			}
		}

		return statuses.filter( (status, idx) => {			
			return status.name.toLowerCase() != 'speech' && idx >= index
		})
	},
	getStatusName: function(status){
		
		var _status = status.toLowerCase();

		for(var i = 0; i < AppConfig.STATUS_MAPPING.length; i++){
			
			if(
				AppConfig.STATUS_MAPPING[i].name.toLowerCase() == _status
			){
				return AppConfig.STATUS_MAPPING[i]
			}
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
	emitNotification(type, flux, message){

		flux.actions.NotificationActions.addNotification({
			title: (type == 'error'? 'Error' : 'Success'),
			level: type,
			message: message
		});
	},
	handleResponse: function(response, flux, successCallback, successMessage){

		if(response.ok){

			// Server response is fine

			var res = JSON.parse(response.text);

			if(res.errors){

				var errs = res.errors.map((data) => data.error);

				utilities.emitNotification('error', flux, errs.join('<br />'))

			}else{

				if(successMessage){

					utilities.emitNotification('success', flux, successMessage)
				}

				successCallback && successCallback(res)
			}
		}else{

			// Server error
			
			utilities.emitNotification('error', flux, response.text)

		}
		
	},
	checkForPermission: function(permission){

		var roleId = CURRENT_USER.roleId;

		/* For Admin and COS Admin */

		if(roleId.indexOf(1) != -1 || roleId.indexOf(2) != -1) return true;

		for(var i = 0; i < AppConfig.ROLES.length; i++){

			if(roleId.indexOf(AppConfig.ROLES[i].id) != -1){

				return AppConfig.ROLES[i].permissions.indexOf(permission) != -1
			}
		}

		return false
	},
	arrayJoin: function(array, key, separator){

		var out = '',
			size = array.length;

		for(var i = 0; i < size; i ++){
			out+= array[i][key] + (i + 1 != size? ', ' : '')			
		}

		return out;
	}

};

module.exports = utilities;