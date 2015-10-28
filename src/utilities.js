module.exports = {
	mapObject: function(object, callback) {
		return Object.keys(object).map(function (key, idx) {
			return callback(key, object[key], idx);
		});
	}
}