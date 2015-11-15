import Fluxxor from 'fluxxor';
import {actions} from '../constants';

var NotificationStore = Fluxxor.createStore({
	initialize: function(){	

		this.bindActions(
			actions.ADD_NOTIFICATION, this.addNotification)
	},
	addNotification: function(payload){
		
		this.emit('add', payload)
	}
});

module.exports = NotificationStore;