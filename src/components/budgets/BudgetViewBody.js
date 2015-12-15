import React from 'react';
import BudgetQuestions from './BudgetQuestions';
import BudgetWorkingDraft from './BudgetWorkingDraft';
import BudgetFinalApprovedReply from './BudgetFinalApprovedReply';
import BudgetAssignToOfficer from './BudgetAssignToOfficer';
import {getStatusName, isSpeech} from './../../utilities';
import Fluxxor from 'fluxxor';
import {StoreWatchMixin} from 'fluxxor';
import Loader from './../Loader';
import {Link} from 'react-router';
import PermissionJail from './../PermissionJail';

var FluxMixin = Fluxxor.FluxMixin(React)

var BudgetViewBody = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin('BudgetStore')],
	contextTypes: {
		router: React.PropTypes.func
	},
	getStateFromFlux: function(){

		return {
			BudgetStore: this.getFlux().store('BudgetStore').getState()
		}
	},
	componentDidMount: function(){

		this.getFlux().actions.BudgetActions.getBudgetById({
			id: this.props.id
		})
	},
	handleDelete: function(){

		if(confirm('Are you sure you want to delete?')){
			this.getFlux().actions.BudgetActions.deleteBudgetCut({
				id: this.props.id
			}, (response) => {

				if(response.success){

					this.context.router.transitionTo('budgets')
				}

			})
		}
	},
	render: function(){

		var {currentBudget} = this.state.BudgetStore;

		if(!Object.keys(currentBudget).length) return <Loader />;

		var memberOfParliament = currentBudget.memberOfParliament? currentBudget.memberOfParliament.name : '';
		var hodSourcing = currentBudget.hodSourcing? currentBudget.hodSourcing.name : '';
		var hodDrafting = currentBudget.hodDrafting? currentBudget.hodDrafting.name : '';
		var liasonOfficer = currentBudget.liasonOfficer? currentBudget.liasonOfficer.name : '';

		var budgetEditActions = !isSpeech(currentBudget.status)?(
			<nav className="budget-cut-actions">
				<Link to = 'budgetsEdit' params ={{id: currentBudget.id}} className="link-edit">Edit</Link>
				<a className="link-delete" onClick = {this.handleDelete}>Delete</a>
			</nav>
		) : null;

		var budgetAssign = !isSpeech(currentBudget.status)?(
			<div>
				<hr className="rule rule--thick" />
			<BudgetAssignToOfficer 
						id = {this.props.id} 
						budget = {currentBudget}
					/>	
			</div>
		) : null;

		var statusText = (currentBudget.status.toLowerCase() == 'speech')? <span className="budget-item-status budget-item-status-view" style = {{backgroundColor: getStatusName(currentBudget.status).color}}>{getStatusName(currentBudget.status).name}</span> : null;

		return (
			<div className="sp-card sp-budget-card">
				<div className="card-body">
					{statusText}

					<PermissionJail permission="canEditDeleteBudgetCut">
						{budgetEditActions}
					</PermissionJail>
					<table className="table table-budget-item table-budget-single">
							<tbody>
								<tr>
									<th>Main topic</th>
									<td>{currentBudget.title}</td>
								</tr>
								<tr>
									<th>Budget cut topic</th>
									<td>{currentBudget.relationships.category}</td>
								</tr>
								<tr>
									<th>Member of Parliament</th>
									<td>{memberOfParliament}</td>
								</tr>
								<tr>
									<th>Sourcing HOD</th>
									<td>{hodSourcing}</td>
								</tr>
								<tr>
									<th>FIle reference no.</th>
									<td>{currentBudget.fileReferenceNo}</td>
								</tr>
								<tr>
									<th>Gist of cuts</th>
									<td>{currentBudget.summary}</td>
								</tr>
								<tr>
									<th>Time for MP to speak (min)</th>
									<td>{currentBudget.time}</td>
								</tr>
							</tbody>
					</table>

					<div className="rule" />

					<BudgetQuestions id = {this.props.id} status = {currentBudget.status} />
					
					<BudgetWorkingDraft id = {this.props.id} status = {currentBudget.status} />

					<BudgetFinalApprovedReply id = {this.props.id} status = {currentBudget.status} />
					
					<PermissionJail permission="canAssignToOfficer">
						{budgetAssign}
					</PermissionJail>
				</div>
				
			</div>
		)
	}
});

module.exports = BudgetViewBody