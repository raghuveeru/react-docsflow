import {actions} from '../constants';
import request from 'superagent';
import NProgress from 'react-nprogress';

module.exports = {
	getBudgets: function(params){		
		
		NProgress.start()

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.ALL)			
			.query(params)
			.end((err, res) => {
				
				this.dispatch(actions.UPDATE_BUDGETS, JSON.parse(res.text));

				NProgress.done()
			});
	},
	getBudgetById: function(payload){

		NProgress.start()
		
		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.SINGLE)			
			.query(payload)
			.end((err, res) => {
				
				this.dispatch(actions.GET_BUDGET_BY_ID, JSON.parse(res.text));

				NProgress.done()
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

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.EXPORT_TO_EXCEL)
			.query({
				id: payload
			})
			.end((err, res) => {
				console.log(err, res)

				NProgress.done()
			})
	},
	addToSpeech: function(payload){

		NProgress.start()

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.ADD_TO_SPEECH)
			.query({
				id: payload
			})
			.end((err, res) => {
				
				this.dispatch(actions.ADD_TO_SPEECH, JSON.parse(res.text));

				NProgress.done()
			})
	},
	assignToOfficer: function(payload){

		NProgress.start()

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.ASSIGN_TO_OFFICER)
			.query(payload)
			.end((err, res) => {
				
				this.dispatch(actions.ASSIGN_TO_OFFICER, JSON.parse(res.text));

				NProgress.done()
			})
	},
	getBudgetActivity: function(payload){

		this.dispatch(actions.FETCHING_BUDGET_ACTIVITY, true);

		NProgress.start()

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.GET_BUDGET_ACTIVITY)
			.query({
				budgetId: payload
			})
			.end((err, res) => {
				
				this.dispatch(actions.GET_BUDGET_ACTIVITY, JSON.parse(res.text));

				NProgress.done()
			})
	},
	createNew: function(payload, callback){
		
		NProgress.start()

		request
			.post(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.CREATE_NEW_BUDGET_CUT)
			.send(payload)
			.end((err, res) => {
				
				// this.dispatch(actions.CREATE_NEW_BUDGET_CUT, JSON.parse(res.text));

				NProgress.done()

				callback && callback(JSON.parse(res.text))
			})

	}
}