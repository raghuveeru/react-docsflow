import {actions} from '../constants';
import request from 'superagent';

module.exports = {	
	getQuestion: function(payload, callback){

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.GET_QUESTION)
			.query({
				budgetCutId: payload
			})
			.end((err, res) => {
				
				this.dispatch(actions.GET_QUESTION, JSON.parse(res.text));

				callback && callback()
			})
	},
	addQuestion: function(payload, callback){

		this.dispatch(actions.ADD_QUESTION, payload)

		callback && callback()
	},
	addWorkingDraft: function(payload, callback){

		this.dispatch(actions.ADD_WORKING_DRAFT, payload)

		callback && callback()
	},
	addFinalApprovedReply: function(payload, callback){

		this.dispatch(actions.ADD_FINAL_APPROVED_REPLY, payload)

		callback && callback()
	},
	getWorkingDraft: function(payload, callback){

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.GET_WORKING_DRAFT)
			.query({
				budgetCutId: payload
			})
			.end((err, res) => {
				
				this.dispatch(actions.GET_WORKING_DRAFT, JSON.parse(res.text));

				callback && callback()
			})
	},
	getFinalApprovedReply: function(payload, callback){

		request
			.get(AppConfig.API.BASE_URL + AppConfig.API.BUDGET.GET_FINAL_APPROVED_REPLY)
			.query({
				budgetCutId: payload
			})
			.end((err, res) => {
				
				this.dispatch(actions.GET_FINAL_APPROVED_REPLY, JSON.parse(res.text));

				callback && callback()
			})
	}
}