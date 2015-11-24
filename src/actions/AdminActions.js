import {actions} from '../constants';
import request from 'superagent';
import {headers} from './../constants';
import NProgress from 'react-nprogress';
import {getUserUrl} from './../utilities';
import {handleResponse} from './../utilities';

var AdminActions = {
	getMappingMpToHods: function(){
		
		NProgress.start()

		request	
			.get(AppConfig.API.BASE_URL + AppConfig.API.MAPPING.GET_MAPPING_MP_TO_HODS)
			.set(headers)
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {
				
					this.dispatch(actions.GET_MAPPING_MP_TO_HODS, jsonResponse);

				});

				NProgress.done()
			})	
	},
	getMappingHodToLiasons: function(){
		
		NProgress.start()

		request	
			.get(AppConfig.API.BASE_URL + AppConfig.API.MAPPING.GET_MAPPING_HOD_TO_LIASONS)
			.set(headers)
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {
				
					this.dispatch(actions.GET_MAPPING_HOD_TO_LIASONS, jsonResponse);

				});

				NProgress.done()
			})	
	},
	createMappingMpToHods: function(payload, callback){

		NProgress.start()

		request	
			.post(AppConfig.API.BASE_URL + AppConfig.API.MAPPING.CREATE_MAPPING_MP_TO_HODS)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {
				
					this.dispatch(actions.CREATE_MAPPING_MP_TO_HODS, jsonResponse);

					callback && callback();

				});

				NProgress.done()
			})	
	},
	updateMappingMpToHods: function(payload, callback){

		NProgress.start()

		request	
			.post(AppConfig.API.BASE_URL + AppConfig.API.MAPPING.UPDATE_MAPPING_MP_TO_HODS)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {
				
					this.dispatch(actions.UPDATE_MAPPING_MP_TO_HODS, jsonResponse);

					callback && callback();

				});

				NProgress.done()
			})	
	},
	createMappingHodToLiasons: function(payload, callback){

		NProgress.start()

		request	
			.post(AppConfig.API.BASE_URL + AppConfig.API.MAPPING.CREATE_MAPPING_HOD_TO_LIASONS)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {
				
					this.dispatch(actions.CREATE_MAPPING_HOD_TO_LIASONS, jsonResponse);

					callback && callback();

				});

				NProgress.done()
			})	
	},
	updateMappingHodToLiasons: function(payload, callback){

		NProgress.start()

		request	
			.post(AppConfig.API.BASE_URL + AppConfig.API.MAPPING.UPDATE_MAPPING_HOD_TO_LIASONS)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {
				
					this.dispatch(actions.UPDATE_MAPPING_HOD_TO_LIASONS, jsonResponse);

					callback && callback();

				});

				NProgress.done()
			})	
	},
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
	getUserById: function(payload, callback){

		NProgress.start();

		request			
			.get(AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_USER_BY_ID)
			.query(payload)
			.set(headers)
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {
				
					this.dispatch(actions.GET_USER_BY_ID, jsonResponse);

					callback && callback(jsonResponse)

				});

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
			.post(getUserUrl('new', payload.type))
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
	updateUser: function(payload, callback){

		NProgress.start();
		
		request
			.post(getUserUrl('update', payload.type))
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {
				
				handleResponse(res, this.flux, (jsonResponse) => {

					this.dispatch(actions.UPDATE_USER, jsonResponse);

					callback && callback()
				
				}, 'User updated successfully.')				

				NProgress.done()
			})
	},
	deleteUser: function(payload, callback){

		NProgress.start();

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.USERS.DELETE_USER)
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
		
	},
	deleteMappingMpToHods: function(payload, callback){

		NProgress.start();

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.MAPPING.DELETE_MAPPING_MP_TO_HODS)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {

					if(jsonResponse.success){
						
						this.dispatch(actions.DELETE_MAPPING_MP_TO_HODS, {
							data: jsonResponse,
							id: payload.id
						});

						callback && callback()
					}					
				
				}, 'Mapping deleted successfully.')				

				NProgress.done()
			})
		
	},
	deleteMappingHodToLiasons: function(payload, callback){

		NProgress.start();

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.MAPPING.DELETE_MAPPING_HOD_TO_LIASONS)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {

				handleResponse(res, this.flux, (jsonResponse) => {

					if(jsonResponse.success){
						
						this.dispatch(actions.DELETE_MAPPING_HOD_TO_LIASONS, {
							data: jsonResponse,
							id: payload.id
						});

						callback && callback()
					}					
				
				}, 'Mapping deleted successfully.')				

				NProgress.done()
			})
		
	}
};

module.exports = AdminActions