import Fluxxor from 'fluxxor';
import {actions} from '../constants';

var BudgetStore = Fluxxor.createStore({
	initialize: function(){

		this.budgets = [];

		this.facets = [];

		this.bindActions(
			actions.UPDATE_BUDGETS, this.updateBudgets
		)
	},
	updateBudgets: function(budgets){

		this.budgets = budgets.data

		this.facets = budgets.facets;

		this.emit('change')
	},
	getState: function(){

		return {
			budgets: this.budgets,
			facets: this.facets,
		}
	}
});

module.exports = BudgetStore