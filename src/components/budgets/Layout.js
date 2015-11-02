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
	componentWillMount: function(){

		this._filters = {
			'topics': this.props.query.topics || '',
			'status': this.props.query.status || '',
			'year': this.props.query.year || new Date().getFullYear()
		}

		this._query = this.props.query.query;
	},	
	contextTypes: {
		router: React.PropTypes.func
	},
	getParams: function(){

		var currentRoutes = this.context.router.getCurrentRoutes();
		var activeRouteName = currentRoutes[currentRoutes.length - 1].name;		

		return Object.assign(
		{
			'query': this._query,
		}, 
		this._filters,
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

		if(nextProps.params.type != this.props.params.type){
			/**
			 * Clear all filter states
			 */
			
			for(var filter in this._filters){
				
				this._filters[filter] = ''

				this._query = '';

				if(filter == 'year') this._filters[filter] = new Date().getFullYear();
			}
		}
		
		if(nextProps.query != this.props.query) this.getBudgets();
	},
	route: function(){

		this.context.router.transitionTo(this.context.router.getCurrentPathname(), null, this.getParams())
	},
	updateQuery: function(event){

		this._query =  event.target.value

		this.route();
	},	
	handleFacetChange: function(facet, value){

		var newFilters = _.clone(this._filters);

		if(facet in newFilters){
			
			newFilters[facet] = value.name		
			
			this._filters = newFilters;

			this.route()
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
			.map((budget) => budget.id);

		if(!ids.length){
			return alert('Please select atleast one budget cut to add to speech');
		}
		
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
				<SearchForm 
					defaultValue = {this._query} 
					placeholder="Search budget cuts" 
					onChange = {this.updateQuery} 
					onSubmit = {this.route}
				/>
				<section className="row">
					<aside className="sp-sidebar">
						<Filters 
							facets = {facets} 
							onChange = {this.handleFacetChange}
							onClearFacet = {this.onClearFacet}
							selected = {this._filters}
						/>
					</aside>
					<section className="sp-content">
						<div className="sp-card">
							<nav className="nav-tabs">								
								<Link to = 'budgetsInbox' params = {{type: 'inbox'}}>My Inbox ({this.state.BudgetStore.totalUserCount})</Link>
								<Link to = 'budgets'>All budget cuts ({this.state.BudgetStore.totalCount})</Link>
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