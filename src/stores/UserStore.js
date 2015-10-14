import Fluxxor from 'fluxxor';
import {actions} from '../constants';

var UserStore = Fluxxor.createStore({
	initialize: function(){
		this.users = []

		this.bindActions(
			actions.UPDATE_USERS, this.updateUsers
		)
	},
	getState: function(){
		return {
			users: this.users
		}
	},
	updateUsers: function(users){

		this.users = users.data

		this.emit('change')
	}
});

module.exports = UserStore