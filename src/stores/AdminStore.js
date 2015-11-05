import Fluxxor from 'fluxxor';
import {actions} from '../constants';

var AdminStore = Fluxxor.createStore({
	initialize: function(){
		this.topics = []

		this.bindActions(
			actions.GET_MAIN_TOPICS, this.getMainTopics,
			actions.CREATE_MAIN_TOPIC, this.createMainTopic,
			actions.EDIT_MAIN_TOPIC, this.editMainTopic,
			actions.DELETE_MAIN_TOPIC, this.deleteMainTopic,
			actions.CREATE_BUDGET_CUT_TOPIC, this.createBudgetCutTopic,
			actions.EDIT_BUDGET_CUT_TOPIC, this.editBudgetCutTopic,
			actions.DELETE_BUDGET_CUT_TOPIC, this.deleteBudgetCutTopic,
		)
	},
	getState: function(){
		return {
			topics: this.topics
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
	}
});

module.exports = AdminStore