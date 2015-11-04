import React from 'react';
import Progress from './Progress';

var BudgetStatus = React.createClass({
	render: function(){

		var {totalStatusCount, totalCount} = this.props;

		if(!totalStatusCount) return null;

		var speechStatus = totalStatusCount.filter((status) => status.name.toLowerCase() == 'speech')
		
		var totalPercent = speechStatus[0].count / totalCount * 100;

		return (
			<div className="budget-status">
				<div className="budget-status-total">
					<Progress 
						percentage = {totalPercent} 
						strokeWidth="6"
                    	r="50" />
				</div>
				{totalStatusCount.map(function(st, idx){
					return (
						<div key = {idx}>
							<div className="budget-status-count">{st.count}</div>
							<div className="budget-status-name">{st.name}</div>
						</div>
					)
				})}
			</div>
		)
	}
});

module.exports = BudgetStatus;