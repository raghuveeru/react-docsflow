import React from 'react';
import BudgetNewFinalApprovedReply from './BudgetNewFinalApprovedReply';
import Fluxxor from 'fluxxor';
import {StoreWatchMixin} from 'fluxxor';
var FluxMixin = Fluxxor.FluxMixin(React)

var BudgetFinalApprovedReply = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin('BudgetDetailStore')],
	getStateFromFlux: function(){

		return {
			BudgetDetailStore: this.getFlux().store('BudgetDetailStore').getState()
		}
	},
	componentDidMount: function(){

		this.getFlux().actions.BudgetDetailActions.getFinalApprovedReply(this.props.id)
		
	},
	render: function(){

		var {finalApprovedReply} = this.state.BudgetDetailStore;

		if(finalApprovedReply.length){

			return (
				<div>
					<h4>Final approved reply details</h4>
					<table className="table table-budget-item table-budget-single">
						
						{finalApprovedReply.map((q, idx) => {

							return (
								<tbody key = {idx}>
								<tr>
									<th>Final approved reply</th>
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
									<th>Final approved reply available?</th>
									<td>{q.available? 'Yes': 'No'}</td>
								</tr>
								<tr>
									<th>Type of reply uploaded</th>
									<td>{q.types.map((type, index) => <span key = {index}>{type}</span> )}</td>
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
				<BudgetNewFinalApprovedReply />
			</div>
		)
	}
});

module.exports = BudgetFinalApprovedReply;