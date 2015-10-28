import {actions} from '../constants';
import request from 'superagent';

module.exports = {
	getUsers: function(){

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.ADMIN.USERS)
			.end((err, res) => {
				
				this.dispatch(actions.UPDATE_USERS, JSON.parse(res.text));
			})		
	},
	getGroups: function(){

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.ADMIN.GROUPS)
			.end((err, res) => {
				
				this.dispatch(actions.UPDATE_GROUPS, JSON.parse(res.text));
			})		
	}
}