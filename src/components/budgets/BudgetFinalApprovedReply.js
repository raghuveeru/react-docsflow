import React from 'react';
import BudgetNewFinalApprovedReply from './BudgetNewFinalApprovedReply';
import AttachmentsView from './AttachmentsView';
import Fluxxor from 'fluxxor';
import {StoreWatchMixin} from 'fluxxor';
import PermissionJail from './../PermissionJail';
var FluxMixin = Fluxxor.FluxMixin(React)

var BudgetFinalApprovedReply = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin('BudgetDetailStore')],
	getStateFromFlux: function(){

		return {
			BudgetDetailStore: this.getFlux().store('BudgetDetailStore').getState()
		}
	},
	getInitialState: function(){

		return {
			editMode: false
		}
	},
	componentDidMount: function(){

		this.getFlux().actions.BudgetDetailActions.getFinalApprovedReply({
			budgetCutId: this.props.id
		})
		
	},
	onEdit: function(){

		this.getFlux().actions.BudgetDetailActions.getFinalApprovedReply({
			budgetCutId: this.props.id,
			edit: true
		}, () => {

			this.setState({
				editMode: true
			})
		});

	},
	render: function(){

		var {finalApprovedReply} = this.state.BudgetDetailStore;
		var {status} = this.props;

		if(this.state.editMode){

			return (
				<div>
					<BudgetNewFinalApprovedReply 
						budgetCutId = {this.props.id}
						finalApprovedReply = {finalApprovedReply} 
						editMode = {this.state.editMode} 
						onFinishEdit = {()=> {
							this.setState({
								editMode: false
							})
						}}
						onCancelForm = {()=> {
							this.setState({
								editMode: false
							})
						}}
					/>
					<hr className="rule" />
				</div>
			)
		}

		var editLink = (status.toLowerCase() != 'speech'? <a className="link-edit link-edit-question" onClick = {this.onEdit}>Edit</a>: null);

		if(finalApprovedReply.length){

			return (
				<div>
					<PermissionJail permission = 'canEditFinalDraft'>
						{editLink}
					</PermissionJail>
					<h4>Final approved reply details</h4>
					<table className="table table-budget-item table-budget-single">
						
						{finalApprovedReply.map((q, idx) => {

							return (
								<tbody key = {idx}>
								<tr>
									<th>Final approved reply</th>
									<td>
										<AttachmentsView attachments = {q.attachments} />
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
			<PermissionJail permission = 'canEditFinalDraft'>
				<div>
					<BudgetNewFinalApprovedReply budgetCutId = {this.props.id} />
					<hr className="rule" />	
				</div>
			</PermissionJail>
		)
	}
});

module.exports = BudgetFinalApprovedReply;