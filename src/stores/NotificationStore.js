import Fluxxor from 'fluxxor';
import {actions} from '../constants';

var NotificationStore = Fluxxor.createStore({
	initialize: function(){	

		this.siteNotifications = [];

		this.bindActions(
			actions.ADD_NOTIFICATION, this.addNotification,
			actions.GET_SITE_NOTIFICATIONS, this.getSiteNotifications
		)
	},
	getState: function(){
		return {
			siteNotifications: this.siteNotifications
		}
	},
	addNotification: function(payload){
		
		this.emit('add', payload)
	},
	getSiteNotifications: function(data){

		this.siteNotifications = data.data;

		this.emit('change')
	}
});

module.exports = NotificationStore;