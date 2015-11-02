module.exports = {
	mapObject: function(object, callback) {
		return Object.keys(object).map(function (key, idx) {
			return callback(key, object[key], idx);
		});
	},
	getStatusName: function(status){
		
		if(status in AppConfig.STATUS_MAPPING){
			 return AppConfig.STATUS_MAPPING[status]
		}

		return 'Please provide status mapping in config file for ' + status;
	}
}