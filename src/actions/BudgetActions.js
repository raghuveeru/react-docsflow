import {actions} from '../constants';
import request from 'superagent';

module.exports = {
	getBudgets: function(params){		
		
		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.ALL)			
			.query(params)
			.end((err, res) => {
				
				this.dispatch(actions.UPDATE_BUDGETS, JSON.parse(res.text));
			});
	},
	getBudgetById: function(payload){
		
		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.SINGLE)			
			.query(payload)
			.end((err, res) => {
				
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

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.EXPORT_TO_EXCEL)
			.query({
				id: payload
			})
			.end((err, res) => {
				console.log(err, res)
			})
	},
	addToSpeech: function(payload){

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.ADD_TO_SPEECH)
			.query({
				id: payload
			})
			.end((err, res) => {
				
				this.dispatch(actions.ADD_TO_SPEECH, JSON.parse(res.text));
			})
	},
	assignToOfficer: function(payload){

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.ASSIGN_TO_OFFICER)
			.query(payload)
			.end((err, res) => {
				
				this.dispatch(actions.ASSIGN_TO_OFFICER, JSON.parse(res.text));
			})
	},
	getBudgetActivity: function(payload){

		this.dispatch(actions.FETCHING_BUDGET_ACTIVITY, true);

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.GET_BUDGET_ACTIVITY)
			.query({
				budgetId: payload
			})
			.end((err, res) => {
				
				this.dispatch(actions.GET_BUDGET_ACTIVITY, JSON.parse(res.text));
			})
	}
}