import {actions} from '../constants';
import request from 'superagent';
import {headers} from './../constants';
import NProgress from 'react-nprogress';
import {getUserUrl} from './../utilities';
import {handleResponse} from './../utilities';

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
	getMainTopics: function(payload){

		NProgress.start()

		request			
			.get(AppConfig.API.BASE_URL + AppConfig.API.TOPICS.GET_MAIN_TOPICS)
			.query(payload)
			.set(headers)
			.end((err, res) => {
				
				this.dispatch(actions.GET_MAIN_TOPICS, JSON.parse(res.text));

				NProgress.done()
			})	
	},
	createMainTopic: function(payload, callback){

		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.TOPICS.CREATE_MAIN_TOPIC)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {

					this.dispatch(actions.CREATE_MAIN_TOPIC, jsonResponse);

					callback && callback()
				
				}, 'Topic saved successfully.')		

				NProgress.done()
			})	
	},
	updateMainTopics: function(payload, callback){

		var topics = payload.topics;

		for(var i = 0; i < topics.length; i++){
			topics[i].order = i + 1
		}

		NProgress.start();

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.TOPICS.UPDATE_ORDER_MAIN_TOPICS)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {
					
					if(jsonResponse.success){
						
						this.dispatch(actions.UPDATE_MAIN_TOPICS, payload)

						callback && callback()
					}
				
				}, 'Order saved successfully.')

				NProgress.done();
				
			});

		
	},
	updateSubTopics: function(payload, callback){

		var topics = payload.topics;

		for(var i = 0; i < topics.length; i++){
			topics[i].order = i + 1
		}

		NProgress.start();

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.TOPICS.UPDATE_ORDER_SUB_TOPICS)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {
					
					if(jsonResponse.success){
						
						this.dispatch(actions.UPDATE_SUB_TOPICS, payload)

						callback && callback()
					}
				
				}, 'Order saved successfully.')

				NProgress.done();
				
			});
		
	},
	editMainTopic: function(payload, callback){

		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.TOPICS.EDIT_MAIN_TOPIC)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {

					this.dispatch(actions.EDIT_MAIN_TOPIC, jsonResponse);

					callback && callback()
				
				}, 'Budget cut topic saved successfully.')				
				

				NProgress.done()
			})	
	},
	createBudgetCutTopic: function(payload, callback){

		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.TOPICS.CREATE_BUDGET_CUT_TOPIC)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {

					this.dispatch(actions.CREATE_BUDGET_CUT_TOPIC, {
						data: jsonResponse,
						topicId: payload.topicId
					});

					callback && callback()
				
				}, 'Budget cut topic saved successfully.')

				NProgress.done()
			})	
	},
	editBudgetCutTopic: function(payload, callback){

		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.TOPICS.EDIT_BUDGET_CUT_TOPIC)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {
				
				handleResponse(res, this.flux, (jsonResponse) => {

					this.dispatch(actions.EDIT_BUDGET_CUT_TOPIC, {
						data: jsonResponse,
						topicId: payload.topicId					
					});

					callback && callback()
				
				}, 'Topic saved successfully.')

				NProgress.done()
			})	
	},
	deleteBudgetCutTopic: function(payload, callback){

		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.TOPICS.DELETE_BUDGET_CUT_TOPIC)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {				

				handleResponse(res, this.flux, (jsonResponse) => {

					this.dispatch(actions.DELETE_BUDGET_CUT_TOPIC, {
						data: jsonResponse,
						topicId: payload.topicId,
						budgetCutTopicId: payload.budgetCutTopicId
					});

					callback && callback()
				
				}, 'Budget cut topic deleted successfully.')

				NProgress.done()
			})
	},
	deleteTopic: function(payload, callback){

		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.TOPICS.DELETE_MAIN_TOPIC)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {

					this.dispatch(actions.DELETE_MAIN_TOPIC, {
						data: jsonResponse,
						topicId: payload.topicId
					});

					callback && callback()
				
				}, 'Topic deleted successfully.')	

				NProgress.done()
			})
	},
	
	addUser: function(payload, callback){

		NProgress.start();
		
		request
			.get(getUserUrl('new', payload.type))
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {
				
				handleResponse(res, this.flux, (jsonResponse) => {

					this.dispatch(actions.CREATE_NEW_USER, jsonResponse);

					callback && callback()
				
				}, 'New user added successfully.')				

				NProgress.done()
			})
	},
	deleteUser: function(payload, callback){

		NProgress.start();

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.USERS.DELETE_USER)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {

					this.dispatch(actions.DELETE_USER, {
						data: jsonResponse,
						userId: payload.id
					});

					callback && callback()
				
				}, 'User deleted successfully.')				

				NProgress.done()
			})
		
	}
};

module.exports = AdminActions