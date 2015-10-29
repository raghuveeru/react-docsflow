import Fluxxor from 'fluxxor';
import {actions} from '../constants';
import _ from 'lodash';

var BudgetStore = Fluxxor.createStore({
	initialize: function(){

		this.budgets = [];
		this.facets = [];
		this.totalCount = 0;
		this.totalSpeechCount = 0;
		this.totalUserCount = 0;
		this.currentBudget = {};

		this.bindActions(
			actions.UPDATE_BUDGETS, this.updateBudgets,
			actions.SELECT_BUDGET, this.selectBudget,
			actions.SELECT_ALL_BUDGETS, this.selectAllBudgets,
			actions.GET_BUDGET_BY_ID, this.getBudgetById,
			actions.ADD_TO_SPEECH, this.addToSpeech,
			actions.ASSIGN_TO_OFFICER, this.assignToOfficer
		)
	},
	updateBudgets: function(budgets){

		this.budgets = budgets.data

		this.facets = budgets.facets;

		this.totalCount = budgets.totalCount;

		this.totalSpeechCount = budgets.totalSpeechCount

		this.totalUserCount = budgets.totalUserCount

		this.emit('change')
	},
	getState: function(){

		return {
			budgets: this.budgets,
			facets: this.facets,
			totalCount: this.totalCount,
			totalUserCount: this.totalUserCount,
			totalSpeechCount: this.totalSpeechCount,
			currentBudget: this.currentBudget
		}
	},
	selectBudget: function(payload){		

		var budgets = _.clone(this.budgets);
		
		for(var i = 0; i < budgets.length; i++){
			if(budgets[i].id == payload.id){

				budgets[i].checked = payload.type				
			}
		}

		this.budgets = budgets

		this.emit('change')
	},
	selectAllBudgets: function(type){
		
		var budgets = _.clone(this.budgets);

		for(var i = 0; i < budgets.length; i++){
			budgets[i].checked = type
		}

		this.budgets = budgets

		this.emit('change')
	},
	getBudgetById: function(item){
		
		this.currentBudget = item.data[0]

		this.emit('change')
	},
	addToSpeech: function(payload){

		var response = payload.data;

		if(!response) return;

		var budgets = _.clone(this.budgets);

		for(var i = 0; i < response.length; i++){
			
			var id = response[i].id,
				needle = _.findIndex(budgets, (item) => item.id == id)

			if(needle != -1){

				budgets[needle].status = response[i].status
			}
			
		}	

		this.budgets = budgets

		/**
		 * Todo Update Status also
		 */

		this.emit('change')

	},
	assignToOfficer: function(budget){
		
		this.currentBudget = budget.data[0]

		this.emit('change');
	}
});

module.exports = BudgetStore