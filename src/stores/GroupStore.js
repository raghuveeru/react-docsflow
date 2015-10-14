import Fluxxor from 'fluxxor';
import {actions} from '../constants';

var GroupStore = Fluxxor.createStore({
	initialize: function(){
		this.groups = []

		this.bindActions(
			actions.UPDATE_GROUPS, this.updateGroups
		)
	},
	getState: function(){
		return {
			groups: this.groups
		}
	},
	updateGroups: function(groups){

		this.groups = groups.data

		this.emit('change')
	}
});

module.exports = GroupStore