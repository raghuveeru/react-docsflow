import Fluxxor from 'fluxxor';
import {actions} from '../constants';
import _ from 'lodash';

var AdminStore = Fluxxor.createStore({
	initialize: function(){
		this.topics = [];

		this.users = []

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
			actions.UPDATE_SUB_TOPICS, this.updateSubTopics
		)
	},
	getState: function(){
		return {
			topics: this.topics,
			users: this.users
		}
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
		
		this.topics = payload
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