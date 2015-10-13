import React from 'react';
import {Link} from 'react-router';
import Filters from './Filters';
import SearchForm from './SearchForm';

var BudgetContainer = React.createClass({
	render: function(){
		
		return (
			<div>
				<SearchForm placeholder="Search budget cuts" />
				<section className="row">
					<aside className="sp-sidebar">
						<Filters />
					</aside>
					<section className="sp-content">
						<div className="sp-card">
							<Link to = '/budgets/all'>My Inbox (4)</Link>
							<Link to = '/budgets/inbox'>All budget cuts (80)</Link>

							<h1>BudgetCutsContainer</h1>
							{this.props.params.type || 'all'}
						</div>

					</section>
				</section>
				
				
			</div>
		)
	}
});


module.exports = BudgetContainer