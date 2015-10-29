import {actions} from '../constants';
import request from 'superagent';

module.exports = {
	getUsers: function(){

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_ALL_USERS)
			.end((err, res) => {
				
				this.dispatch(actions.UPDATE_USERS, JSON.parse(res.text));
			})		
	}
}