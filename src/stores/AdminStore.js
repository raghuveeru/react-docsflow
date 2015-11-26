import Fluxxor from 'fluxxor';
import {actions} from '../constants';
import _ from 'lodash';

var AdminStore = Fluxxor.createStore({
	initialize: function(){
		this.topics = [];

		this.users = [];

		this.mappingMPHods = [];

		this.mappingHodLiasons = [];

		this.topicYears = [];

		this.bindActions(
			actions.GET_MAIN_TOPICS, this.getMainTopics,
			actions.CREATE_MAIN_TOPIC, this.createMainTopic,
			actions.EDIT_MAIN_TOPIC, this.editMainTopic,
			actions.DELETE_MAIN_TOPIC, this.deleteMainTopic,
			actions.CREATE_BUDGET_CUT_TOPIC, this.createBudgetCutTopic,
			actions.EDIT_BUDGET_CUT_TOPIC, this.editBudgetCutTopic,
			actions.DELETE_BUDGET_CUT_TOPIC, this.deleteBudgetCutTopic,
			actions.GET_ALL_USERS, this.getAllUsers,
			actions.GET_ALL_USERS_ADMIN, this.getAllUsers,
			actions.CREATE_NEW_USER, this.addUser,
			actions.DELETE_USER, this.deleteUser,
			actions.UPDATE_MAIN_TOPICS, this.updateMainTopics,
			actions.UPDATE_SUB_TOPICS, this.updateSubTopics,			
			actions.UPDATE_USER, this.updateUser,
			actions.GET_MAPPING_MP_TO_HODS, this.getMappingMpToHods,
			actions.GET_MAPPING_HOD_TO_LIASONS, this.getMappingHodLiasons,
			actions.DELETE_MAPPING_MP_TO_HODS, this.deleteMappingMpToHods,
			actions.DELETE_MAPPING_HOD_TO_LIASONS, this.deleteMappingHodLiasons,
			actions.CREATE_MAPPING_MP_TO_HODS, this.createMappingMpToHods,
			actions.CREATE_MAPPING_HOD_TO_LIASONS, this.createMappingHodLiasons,
			actions.UPDATE_MAPPING_MP_TO_HODS, this.updateMappingMpToHods,
			actions.UPDATE_MAPPING_HOD_TO_LIASONS, this.updateMappingHodLiasons,
			actions.GET_TOPIC_YEARS, this.getTopicYears
		)
	},
	getState: function(){
		return {
			topics: this.topics,
			users: this.users,
			mappingMPHods: this.mappingMPHods,
			mappingHodLiasons: this.mappingHodLiasons,
			topicYears: this.topicYears
		}
	},
	getTopicYears: function(payload){

		this.topicYears = payload.data;

		this.emit('change')
	},
	getMappingMpToHods: function(payload){

		this.mappingMPHods = payload.data;

		this.emit('change')
	},
	getMappingHodLiasons: function(payload){

		this.mappingHodLiasons = payload.data;

		this.emit('change')
	},
	createMappingMpToHods: function(payload){
		
		this.mappingMPHods = [].concat(this.mappingMPHods, payload.data);

		this.emit('change')
	},
	createMappingHodLiasons: function(payload){
		
		this.mappingHodLiasons = [].concat(this.mappingHodLiasons, payload.data);

		this.emit('change')
	},
	updateMappingMpToHods: function(payload){
		
		var _response = payload.response.data[0],
			index = payload.index;

		if(!_response) return;
		
		this.mappingMPHods[index] = _response;

		this.emit('change')
	},
	updateMappingHodLiasons: function(payload){

		var _response = payload.response.data[0],
			index = payload.index;

		if(!_response) return;

		this.mappingHodLiasons[index] = _response;

		this.emit('change')
	},
	deleteMappingMpToHods: function(payload){
		console.log(payload)
		var data = payload.data.success,
			index = payload.index

		if(data){

			this.mappingMPHods.splice(index, 1);

			this.emit('change')
		}
	},
	deleteMappingHodLiasons: function(payload){

		var data = payload.data.success,
			index = payload.id

		if(data){

			this.mappingHodLiasons.splice(index, 1);

			this.emit('change')
		}
	},
	updateUser: function(payload){
		
		var _user = payload.data[0];
		console.log(_user)
		if(!_user) return ;

		var _id = _user.id;

		var _users = _.clone(this.users);

		for(var i = 0; i < _users.length; i++){

			if(_users[i].id == _id){				
				_users[i] = _user
			}
		}

		this.users = _users;

		this.emit('change')

	},
	getMainTopics: function(topics){

		this.topics = topics.data

		this.emit('change')
	},
	createMainTopic: function(payload){

		var data = payload.data[0];

		this.topics.unshift(data)

		this.emit('change')
	},
	updateMainTopics: function(payload){
		
		this.topics = payload;
	},
	updateSubTopics: function(payload){

		var _topics = _.clone(this.topics);

		for(var i = 0; i < _topics.length; i++){
			if(_topics[i].id == payload.mainTopicId){
				_topics.budgetCutTopic = payload.subTopics
			}
		}

		this.topics = _topics
	},
	editMainTopic: function(payload){

		var data = payload.data[0]

		for(var i = 0; i < this.topics.length; i++){
			if(this.topics[i].id == data.id){
				this.topics[i].name = data.name
			}
		}

		this.emit('change')
	},
	deleteMainTopic: function(payload){

		var data = payload.data.success,
			topicId = payload.topicId

		if(data){

			for(var j = this.topics.length - 1; j >= 0; j--) {
				if(this.topics[j].id == topicId){
					this.topics.splice(j, 1);
				}
			}

			this.emit('change')
		}
	},
	createBudgetCutTopic: function(payload){

		var data = payload.data.data[0],
			topicId = payload.topicId


		for(var i = 0; i < this.topics.length; i++){
			if(this.topics[i].id == topicId){

				var budgetCutTopics = this.topics[i].budgetCutTopic;

				budgetCutTopics.push(data);
								
			}
		}

		this.emit('change')
		
	},
	editBudgetCutTopic: function(payload){

		var data = payload.data.data[0],
			topicId = payload.topicId


		for(var i = 0; i < this.topics.length; i++){
			if(this.topics[i].id == topicId){

				var budgetCutTopics = this.topics[i].budgetCutTopic;

				for(var j = 0; j < budgetCutTopics.length; j++){
					if(budgetCutTopics[j].id == data.id){
						budgetCutTopics[j].name = data.name
					}
				}
			}
		}

		this.emit('change')
	},
	deleteBudgetCutTopic: function(payload){

		var data = payload.data.success,
			topicId = payload.topicId,
			budgetCutTopicId = payload.budgetCutTopicId

		if(data){

			for(var i = 0; i < this.topics.length; i++){
				if(this.topics[i].id == topicId){

					var budgetCutTopics = this.topics[i].budgetCutTopic;
					
					for(var j = budgetCutTopics.length - 1; j >= 0; j--) {
						if(budgetCutTopics[j].id == budgetCutTopicId){
							
							budgetCutTopics.splice(j, 1)
						}
					}
				}
			}

			this.emit('change')
		}
	},
	getAllUsers: function(users){

		this.users = users.data

		this.emit('change')
	},
	addUser: function(payload){

		var user = payload.data[0]

		this.users.unshift(user)

		this.emit('change')
	},
	deleteUser: function(payload){

		var data = payload.data.success,
			userId = payload.userId;

		if(data){
			for(var i = this.users.length - 1; i >= 0; i --){
				if(this.users[i].id == userId){
					this.users.splice(i, 1)
				}
			}

			this.emit('change')
		}
	}
});

module.exports = AdminStore