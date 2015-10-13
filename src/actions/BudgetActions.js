import {actions} from '../constants';

module.exports = {
	getBudgets: function(){

		this.dispatch(actions.GET_BUDGETS);
	}
}