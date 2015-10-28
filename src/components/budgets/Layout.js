import React from 'react';
import {Link} from 'react-router';
import Filters from './Filters';
import SearchForm from './SearchForm';
import BudgetList from './BudgetList';
import BudgetStatus from './BudgetStatus';
import {StoreWatchMixin} from 'fluxxor';
import Fluxxor from 'fluxxor';
import _ from 'lodash';

var FluxMixin = Fluxxor.FluxMixin(React)

var BudgetContainer = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin('BudgetStore')],
	getStateFromFlux: function(){

		return {
			BudgetStore: this.props.flux.stores.BudgetStore.getState(),
		}
	},
	getInitialState: function(){

		return {
			query: this.props.query.query,
			filters: {
				'topics': this.props.query.topics || '',
				'status': this.props.query.status || '',
				'year': this.props.query.year || new Date().getFullYear()
			}
		}
	},
	contextTypes: {
		router: React.PropTypes.func
	},
	getParams: function(){

		var currentRoutes = this.context.router.getCurrentRoutes();
		var activeRouteName = currentRoutes[currentRoutes.length - 1].name;		

		return Object.assign(
		{
			'query': this.state.query,
		}, 
		this.state.filters,
		(!activeRouteName || activeRouteName == 'budgetsInbox'? {'userId': CURRENT_USER.id} : {})
		)

	},
	getBudgets: function(){
		
		this.props.flux.actions.BudgetActions.getBudgets(this.getParams());
	},
	componentDidMount: function(){

		this.getBudgets();
		
	},
	componentDidUpdate: function(nextProps, nextState){
		
		if(nextProps.query != this.props.query) this.getBudgets();
	},
	route: function(){

		this.context.router.transitionTo(this.context.router.getCurrentPathname(), null, this.getParams())
	},
	updateQuery: function(event){

		this.setState({
			
			query: event.target.value

		}, this.route)
	},	
	handleFacetChange: function(facet, value){

		var newFilters = _.clone(this.state.filters);

		if(facet in newFilters){
			
			newFilters[facet] = value.name		
		
			this.setState({
				filters: newFilters
			}, this.route)
		}
	
	},
	onClearFacet: function(facet){

		this.handleFacetChange(facet, {name: ''});
	},
	handleExportToExcel: function(){

		var ids = this.state.BudgetStore.budgets.map((budget) => budget.id)

		this.getFlux().actions.BudgetActions.exportToExcel(ids);
	},
	handleSpeech: function(){

		var ids = this.state.BudgetStore.budgets
			.filter((budget) => budget.checked)
			.map((budget) => budget.id)
		
		this.getFlux().actions.BudgetActions.addToSpeech(ids);
	},
	render: function(){
		var currentRoutes = this.context.router.getCurrentRoutes();
		var activeRouteName = currentRoutes[currentRoutes.length - 1].name;

		var {facets, totalCount, totalSpeechCount, budgets} = this.state.BudgetStore;
		var budgetStatus = (activeRouteName && activeRouteName != 'budgetsInbox'? <BudgetStatus 
								facets = {facets} 
								totalCount = {totalCount}
								totalSpeechCount = {totalSpeechCount}
							/> : null);
		
		/**
		 * Check All
		 * @type {Boolean}
		 */
		var isAllSelected = false;
		var checkedBudgets = budgets.filter((b) => b.checked);

		if(checkedBudgets.length == budgets.length) isAllSelected = true
		
		return (
			<div>
				<SearchForm placeholder="Search budget cuts" onChange = {this.updateQuery} />
				<section className="row">
					<aside className="sp-sidebar">
						<Filters 
							facets = {facets} 
							onChange = {this.handleFacetChange}
							onClearFacet = {this.onClearFacet}
							selected = {this.state.filters}
						/>
					</aside>
					<section className="sp-content">
						<div className="sp-card">
							<nav className="nav-tabs">
								<a href="#/budgetsInbox" className={!activeRouteName || activeRouteName == 'budgetsInbox'? 'active': ''}>My Inbox ({this.state.BudgetStore.totalUserCount})</a>
								<a href="#/budgets" className={activeRouteName && activeRouteName != 'budgetsInbox'? 'active': ''}>All budget cuts ({this.state.BudgetStore.totalCount})</a>
							</nav>
							{budgetStatus}
							
							<div className="budget-actions">
								<input 
									type = "checkbox"
									onClick = {(event) => {
										this.getFlux().actions.BudgetActions.selectAllBudgets(event.target.checked)
									}}
									checked = {isAllSelected}
								/>

								<a 
									className="link-speech"
									onClick = {this.handleSpeech}
								>Speech</a>

								<a className="link-export-excel" onClick = {this.handleExportToExcel}>Export to excel</a>
							</div>
							<BudgetList budgets = {budgets} />
							
						</div>

					</section>
				</section>
				
				
			</div>
		)
	}
});


module.exports = BudgetContainer