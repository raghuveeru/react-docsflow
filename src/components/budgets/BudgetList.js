import React from 'react';
import BudgetGroup from './BudgetGroup';

var BudgetList = React.createClass({	
	render: function(){

		var {budgets} = this.props;

		var temp = {},
			budgetGroups = [];

		/**
		 * Create groups
		 * @param  {[type]} budget){			var group         [description]
		 * @return {[type]}                 [description]
		 */
		budgets.forEach(function(budget){
			var group = budget.relationships.category;

			temp[group] = temp[group] || [];
			temp[group]['name'] = temp[group]['name'] || group;
			temp[group]['items'] = temp[group]['items'] || []
			temp[group]['items'].push(budget);
		})


		Object.keys(temp).map( function( group )
  		{
  			budgetGroups.push(temp[group])
  		})


		return (
			<div>
				{budgetGroups.map((group, idx) => {

					return (
						<BudgetGroup group = {group} />
					)
				})}
			</div>
		)
	}
});

module.exports = BudgetList