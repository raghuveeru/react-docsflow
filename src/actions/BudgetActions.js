import {actions} from '../constants';
import request from 'superagent';
import NProgress from 'react-nprogress';
import {headers} from './../constants';

module.exports = {
	getBudgets: function(params){		
		
		NProgress.start()

		request		
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.ALL)
			.set(headers)
			.query(params)
			.end((err, res) => {
				
				NProgress.done()

				this.dispatch(actions.UPDATE_BUDGETS, JSON.parse(res.text));				
			});
	},
	getBudgetById: function(payload){

		NProgress.start()
		
		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.SINGLE)
			.set(headers)
			.query(payload)
			.end((err, res) => {
				
				NProgress.done()

				this.dispatch(actions.GET_BUDGET_BY_ID, JSON.parse(res.text));				
			});
	},
	selectBudget: function(id, type){
		
		this.dispatch(actions.SELECT_BUDGET, {
			id: id,
			type: type
		})
	},
	selectAllBudgets: function(type){

		this.dispatch(actions.SELECT_ALL_BUDGETS, type)
	},
	exportToExcel: function(payload){

		NProgress.start()

		var data = {
			"id": payload
		};

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.EXPORT_TO_EXCEL)
			.set(headers)
			.send(JSON.stringify(data))
			.end((err, res) => {
				
				NProgress.done()
				
			})
	},
	addToSpeech: function(payload){

		NProgress.start()

		var data = {
			"id": payload
		};

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.ADD_TO_SPEECH)
			.set(headers)
			.send(JSON.stringify(data))
			.end((err, res) => {
				
				NProgress.done()

				this.dispatch(actions.ADD_TO_SPEECH, JSON.parse(res.text));
				
			})
	},
	assignToOfficer: function(payload){

		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.ASSIGN_TO_OFFICER)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {

				NProgress.done()
				
				this.dispatch(actions.ASSIGN_TO_OFFICER, JSON.parse(res.text));				
			})
	},
	getBudgetActivity: function(payload){

		this.dispatch(actions.FETCHING_BUDGET_ACTIVITY, true);

		NProgress.start()

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.GET_BUDGET_ACTIVITY)
			.set(headers)
			.query({
				budgetId: payload
			})
			.end((err, res) => {
				
				NProgress.done()
				
				this.dispatch(actions.GET_BUDGET_ACTIVITY, JSON.parse(res.text));				
			})
	},
	createNew: function(payload, callback){
		
		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.CREATE_NEW_BUDGET_CUT)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {
				
				// this.dispatch(actions.CREATE_NEW_BUDGET_CUT, JSON.parse(res.text));

				NProgress.done()

				callback && callback(JSON.parse(res.text))
			})

	},
	updateBudgetCut: function(payload, callback){
		
		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.UPDATE_BUDGET_CUT)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {
				
				// this.dispatch(actions.UPDATE_BUDGET_CUT, JSON.parse(res.text));

				NProgress.done()

				callback && callback(JSON.parse(res.text))
			})

	},
	deleteBudgetCut: function(payload, callback){

		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.DELETE_BUDGET_CUT)
			.set(headers)
			.send(JSON.stringify(payload))
			.end((err, res) => {
								
				NProgress.done()

				callback && callback(JSON.parse(res.text))
			})
	},
	deleteAttachment: function(payload, callback){

		NProgress.start()

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.DELETE_ATTACHMENT)
			.set(headers)
			.query(JSON.stringify(payload))
			.end((err, res) => {
								
				NProgress.done()

				callback && callback(JSON.parse(res.text))
			})
	}
}