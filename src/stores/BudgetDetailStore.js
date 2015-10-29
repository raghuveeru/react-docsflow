import Fluxxor from 'fluxxor';
import {actions} from '../constants';

var BudgetDetailStore = Fluxxor.createStore({
	initialize: function(){
		this.question = []

		this.workingDraft = [];

		this.finalApprovedReply = []

		this.bindActions(
			actions.GET_QUESTION, this.getQuestion,
			actions.GET_WORKING_DRAFT, this.getWorkingDraft,
			actions.GET_FINAL_APPROVED_REPLY, this.getFinalApprovedReply
		)
	},
	getState: function(){
		return {
			question: this.question,
			workingDraft: this.workingDraft,
			finalApprovedReply: this.finalApprovedReply
		}
	},
	getQuestion: function(question){

		this.question = question.data

		this.emit('change')
	},
	getWorkingDraft: function(draft){

		this.workingDraft = draft.data

		this.emit('change')
	},
	getFinalApprovedReply: function(reply){

		this.finalApprovedReply = reply.data

		this.emit('change')
	}
});

module.exports = BudgetDetailStore