import {actions} from '../constants';
import request from 'superagent';
import {headers} from './../constants';
import NProgress from 'react-nprogress';
import {getUserUrl} from './../utilities';

var AdminActions = {
	getUsers: function(){

		NProgress.start()

		request			
			.get(AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_ALL_USERS)
			.set(headers)
			.end((err, res) => {
				
				this.dispatch(actions.GET_ALL_USERS, JSON.parse(res.text));

				NProgress.done()
			})		
	},
	getUsersAdmin: function(){

		NProgress.start()

		request			
			.get(AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_ALL_USERS_ADMIN)
			.set(headers)
			.end((err, res) => {
				
				this.dispatch(actions.GET_ALL_USERS_ADMIN, JSON.parse(res.text));

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
	},
	
	addUser: function(payload, callback){

		NProgress.start();
		
		request
			.post(getUserUrl('new', payload.type))
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {
				
				this.dispatch(actions.CREATE_NEW_USER, JSON.parse(res.text));

				callback && callback()

				NProgress.done()
			})
	},
	deleteUser: function(payload){

		NProgress.start();

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.USERS.DELETE_USER)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {
				
				this.dispatch(actions.DELETE_USER, {
					data: JSON.parse(res.text),
					userId: payload.userId
				});

				NProgress.done()
			})
		
	}
};

module.exports = AdminActions