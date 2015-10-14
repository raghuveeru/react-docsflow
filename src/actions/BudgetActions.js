import {actions} from '../constants';
import config from '../config';
import request from 'superagent';

module.exports = {
	getBudgets: function(){

		request
			.get(config.BASE_URL + config.BUDGET.ALL)
			.end((err, res) => {
				
				this.dispatch(actions.UPDATE_BUDGETS, JSON.parse(res.text));
			});
	}
}