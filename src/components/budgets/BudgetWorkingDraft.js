import React from 'react';
import BudgetNewWorkingDraft from './BudgetNewWorkingDraft';
import Fluxxor from 'fluxxor';
import {StoreWatchMixin} from 'fluxxor';
var FluxMixin = Fluxxor.FluxMixin(React)

var BudgetWorkingDraft = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin('BudgetDetailStore')],
	getStateFromFlux: function(){

		return {
			BudgetDetailStore: this.getFlux().store('BudgetDetailStore').getState()
		}
	},
	componentDidMount: function(){

		this.getFlux().actions.BudgetDetailActions.getWorkingDraft(this.props.id)
		
	},
	render: function(){

		var {workingDraft} = this.state.BudgetDetailStore;

		if(workingDraft.length){

			return (
				<div>
					<h4>Working draft details</h4>
					<table className="table table-budget-item table-budget-single">
						
						{workingDraft.map((q, idx) => {

							return (
								<tbody key = {idx}>								
								<tr>
									<th>Working draft within division/department</th>
									<td>
										{q.attachments.map((attachment, index) => {
											return (
												<a href={attachment.downloadUrl} key = {index}>
													{attachment.fileName}
												</a>
											)
										})}
									</td>
								</tr>
								<tr>
									<th>Working draft available?</th>
									<td>{q.available? 'Yes': 'No'}</td>
								</tr>
								<tr>
									<td colSpan="2">
										<div className="activity-meta">
											{q.date}
											<a className="link-edit-question">Edit</a>
										</div>
									</td>
								</tr>
								</tbody>
							)
						})}
						
					</table>
					<hr className="rule" />					
				</div>
			)
		}
		
		return (
			<div>				
				<BudgetNewWorkingDraft />
			</div>
		)
	}
});

module.exports = BudgetWorkingDraft;