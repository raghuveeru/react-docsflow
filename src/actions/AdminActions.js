import {actions} from '../constants';
import request from 'superagent';
import {headers} from './../constants';
import NProgress from 'react-nprogress';

module.exports = {
	getUsers: function(){

		NProgress.start()

		request			
			.get(AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_ALL_USERS)
			.set(headers)
			.end((err, res) => {
				
				this.dispatch(actions.UPDATE_USERS, JSON.parse(res.text));

				NProgress.done()
			})		
	},
	getMainTopics: function(){

		NProgress.start()

		request			
			.get(AppConfig.API.BASE_URL + AppConfig.API.TOPICS.GET_MAIN_TOPICS)
			.set(headers)
			.end((err, res) => {
				
				this.dispatch(actions.GET_MAIN_TOPICS, JSON.parse(res.text));

				NProgress.done()
			})	
	},
	createMainTopic: function(payload){

		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.TOPICS.CREATE_MAIN_TOPIC)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {
				
				this.dispatch(actions.CREATE_MAIN_TOPIC, JSON.parse(res.text));

				NProgress.done()
			})	
	},
	editMainTopic: function(payload){

		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.TOPICS.EDIT_MAIN_TOPIC)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {
				
				this.dispatch(actions.EDIT_MAIN_TOPIC, JSON.parse(res.text));

				NProgress.done()
			})	
	},
	createBudgetCutTopic: function(payload){

		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.TOPICS.CREATE_BUDGET_CUT_TOPIC)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {
				
				this.dispatch(actions.CREATE_BUDGET_CUT_TOPIC, {
					data: JSON.parse(res.text),
					topicId: payload.topicId
				});

				NProgress.done()
			})	
	},
	editBudgetCutTopic: function(payload){

		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.TOPICS.EDIT_BUDGET_CUT_TOPIC)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {
				
				this.dispatch(actions.EDIT_BUDGET_CUT_TOPIC, {
					data: JSON.parse(res.text),
					topicId: payload.topicId					
				});

				NProgress.done()
			})	
	},
	deleteBudgetCutTopic: function(payload){

		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.TOPICS.DELETE_BUDGET_CUT_TOPIC)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {
				
				this.dispatch(actions.DELETE_BUDGET_CUT_TOPIC, {
					data: JSON.parse(res.text),
					topicId: payload.topicId,
					budgetCutTopicId: payload.budgetCutTopicId
				});

				NProgress.done()
			})
	},
	deleteTopic: function(payload){

		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.TOPICS.DELETE_MAIN_TOPIC)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {
				
				this.dispatch(actions.DELETE_MAIN_TOPIC, {
					data: JSON.parse(res.text),
					topicId: payload.topicId
				});

				NProgress.done()
			})
	}
}