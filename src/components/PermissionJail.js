import React from 'react';
import {checkForPermission} from './../utilities';

export default class PermissionJail extends React.Component{
	render(){

		if(checkForPermission(this.props.permission)){

			return this.props.children
		}


		return null;
	}
};