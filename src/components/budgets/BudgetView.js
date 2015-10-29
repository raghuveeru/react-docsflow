import React from 'react';
import {StoreWatchMixin} from 'fluxxor';
import BudgetActivity from './BudgetActivity';
import BudgetQuestions from './BudgetQuestions';
import BudgetWorkingDraft from './BudgetWorkingDraft';
import BudgetFinalApprovedReply from './BudgetFinalApprovedReply';
import Loader from './../Loader';
import BudgetAssignToOfficer from './BudgetAssignToOfficer';
import {getStatusName} from './../../utilities';
import Fluxxor from 'fluxxor';
var FluxMixin = Fluxxor.FluxMixin(React)

var BudgetView = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin('BudgetStore')],
	getStateFromFlux: function(){

		return {
			BudgetStore: this.props.flux.stores.BudgetStore.getState()
		}
	},
	contextTypes: {
		router: React.PropTypes.func
	},
	componentDidMount: function(){

		this.getFlux().actions.BudgetActions.getBudgetById({
			id: this.props.params.id
		})
	},
	goBack: function(){
		if(window.history.length){
			window.history.go(-1)
		}
	},
	render: function(){
		
		var {currentBudget} = this.state.BudgetStore;

		if(!Object.keys(currentBudget).length) return <Loader />;

		return (
			<div>
				<nav className="nav-crumb">
					<a onClick = {this.goBack}>
						<em className="fa fa-home" />
					</a>
				</nav>
				<h1>Budget cut details</h1>
				<div className="row">
					<div className="sp-content">
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

								<BudgetQuestions id = {this.props.params.id} />
								
								<BudgetWorkingDraft id = {this.props.params.id} />

								<BudgetFinalApprovedReply id = {this.props.params.id} />
								
								<BudgetAssignToOfficer id = {this.props.params.id} />	
							</div>
							
						</div>
					</div>
					<div className="sp-sidebar">
						<BudgetActivity activity = {currentBudget.activity} />
					</div>
				</div>
			</div>
		)
	}
});

module.exports = BudgetView