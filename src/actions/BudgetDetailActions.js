import {actions} from '../constants';
import request from 'superagent';

module.exports = {	
	getQuestion: function(payload){

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.GET_QUESTION)
			.query({
				budgetCutId: payload
			})
			.end((err, res) => {
				
				this.dispatch(actions.GET_QUESTION, JSON.parse(res.text));
			})
	},
	getWorkingDraft: function(payload){

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.GET_WORKING_DRAFT)
			.query({
				budgetCutId: payload
			})
			.end((err, res) => {
				
				this.dispatch(actions.GET_WORKING_DRAFT, JSON.parse(res.text));
			})
	},
	getFinalApprovedReply: function(payload){

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.GET_FINAL_APPROVED_REPLY)
			.query({
				budgetCutId: payload
			})
			.end((err, res) => {
				
				this.dispatch(actions.GET_FINAL_APPROVED_REPLY, JSON.parse(res.text));
			})
	}
}