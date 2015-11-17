import React from 'react';
import {checkForPermission} from './../utilities';

var PermissionJail = React.createClass({
	render: function(){

		if(checkForPermission(this.props.permission)){

			return this.props.children
		}


		return null;
	}
});

module.exports = PermissionJail