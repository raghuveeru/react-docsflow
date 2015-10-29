import React from 'react';
import BudgetQuestions from './BudgetQuestions';
import BudgetWorkingDraft from './BudgetWorkingDraft';
import BudgetFinalApprovedReply from './BudgetFinalApprovedReply';
import BudgetAssignToOfficer from './BudgetAssignToOfficer';
import {getStatusName} from './../../utilities';
import Fluxxor from 'fluxxor';
import {StoreWatchMixin} from 'fluxxor';
import Loader from './../Loader';
var FluxMixin = Fluxxor.FluxMixin(React)

var BudgetViewBody = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin('BudgetStore')],
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
	render: function(){

		var {currentBudget} = this.state.BudgetStore;

		if(!Object.keys(currentBudget).length) return <Loader />;


		return (
			<div className="sp-card sp-budget-card">
				<div className="card-body">
					<span className="budget-item-status budget-item-status-view">{getStatusName(currentBudget.status)}</span>
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
									<td>{currentBudget.memberOfParliament}</td>
								</tr>
								<tr>
									<th>Sourcing HOD</th>
									<td>{currentBudget.hodSourcing}</td>
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
					
					<BudgetAssignToOfficer id = {this.props.id} />	
				</div>
				
			</div>
		)
	}
});

module.exports = BudgetViewBody