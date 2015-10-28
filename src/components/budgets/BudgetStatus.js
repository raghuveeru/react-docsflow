import React from 'react';
import Progress from './Progress';

var BudgetStatus = React.createClass({
	render: function(){

		var {facets, totalCount, totalSpeechCount} = this.props;

		if(!facets) return null;

		var {status} = facets;

		if(!status) return null;

		var totalPercent = totalSpeechCount / totalCount * 100;

		return (
			<div className="budget-status">
				<div className="budget-status-total">
					<Progress 
						percentage = {60} 
						strokeWidth="6"
                    	r="50" />
				</div>
				{status.map(function(st, idx){
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