import React from 'react';
import BudgetQuestions from './BudgetQuestions';
import BudgetWorkingDraft from './BudgetWorkingDraft';
import BudgetFinalApprovedReply from './BudgetFinalApprovedReply';
import BudgetAssignToOfficer from './BudgetAssignToOfficer';
import {getStatusName} from './../../utilities';
import Fluxxor from 'fluxxor';
import {StoreWatchMixin} from 'fluxxor';
import Loader from './../Loader';
import {Link} from 'react-router';
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

		return (
			<div className="sp-card sp-budget-card">
				<div className="card-body">
					<span className="budget-item-status budget-item-status-view">{getStatusName(currentBudget.status)}</span>

					<nav className="budget-cut-actions">
						<Link to = 'budgetsEdit' params ={{id: currentBudget.id}} className="link-edit">Edit</Link>
						<a className="link-delete" onClick = {this.handleDelete}>Delete</a>
					</nav>
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

					<BudgetQuestions id = {this.props.id} />
					
					<BudgetWorkingDraft id = {this.props.id} />

					<BudgetFinalApprovedReply id = {this.props.id} />
					
					<BudgetAssignToOfficer 
						id = {this.props.id} 
						budget = {currentBudget}
					/>	
				</div>
				
			</div>
		)
	}
});

module.exports = BudgetViewBody