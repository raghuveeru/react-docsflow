import React from 'react';
import {Link} from 'react-router';
import Filters from './Filters';
import SearchForm from './SearchForm';
import BudgetList from './BudgetList';
import {StoreWatchMixin} from 'fluxxor';

var BudgetContainer = React.createClass({
	mixins: [StoreWatchMixin('BudgetStore')],
	getStateFromFlux: function(){

		return {
			BudgetStore: this.props.flux.stores.BudgetStore.getState(),
		}
	},
	contextTypes: {
		router: React.PropTypes.func
	},
	componentDidMount: function(){

		var pathName = this.context.router.getCurrentPathname();		

		this.props.flux.actions.BudgetActions.getBudgets();
		
	},
	componentDidUpdate: function(nextProps){
		
		if(nextProps.params.type != this.props.params.type){
			this.props.flux.actions.BudgetActions.getBudgets(nextProps.params.type);
		}
	},
	render: function(){
		
		return (
			<div>
				<SearchForm placeholder="Search budget cuts" />
				<section className="row">
					<aside className="sp-sidebar">
						<Filters facets = {this.state.BudgetStore.facets} />
					</aside>
					<section className="sp-content">
						<div className="sp-card">
							<nav className="nav-tabs">
								<Link to = '/budgets/all'>My Inbox (4)</Link>
								<Link to = '/budgets/inbox'>All budget cuts (80)</Link>
							</nav>

							<BudgetList budgets = {this.state.BudgetStore.budgets} />
							
						</div>

					</section>
				</section>
				
				
			</div>
		)
	}
});


module.exports = BudgetContainer