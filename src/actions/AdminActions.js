import {actions} from '../constants';
import config from '../config';
import request from 'superagent';

module.exports = {
	getUsers: function(){

		request
			.get(config.ADMIN.USERS)
			.end((err, res) => {
				
				this.dispatch(actions.UPDATE_USERS, JSON.parse(res.text));
			})		
	},
	getGroups: function(){

		request
			.get(config.ADMIN.GROUPS)
			.end((err, res) => {
				
				this.dispatch(actions.UPDATE_GROUPS, JSON.parse(res.text));
			})		
	}
}