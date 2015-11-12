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
	getInitialState: function(){

		return {
			editMode: false
		}
	},
	componentDidMount: function(){

		this.getFlux().actions.BudgetDetailActions.getWorkingDraft(this.props.id)
		
	},
	onEdit: function(){

		this.getFlux().actions.BudgetDetailActions.getWorkingDraft(this.props.id, () => {

			this.setState({
				editMode: true
			})
		});

	},
	render: function(){

		var {workingDraft} = this.state.BudgetDetailStore;		

		if(this.state.editMode){

			return (
				<div>
					<BudgetNewWorkingDraft 
						workingDraft = {workingDraft}
						budgetCutId = {this.props.id} 
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
												<a className="file-attachment" href={attachment.downloadUrl} key = {index}>
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
											<a className="link-edit-question" onClick = {this.onEdit}>Edit</a>
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
				<BudgetNewWorkingDraft budgetCutId = {this.props.id} />
				<hr className="rule" />	
			</div>
		)
	}
});

module.exports = BudgetWorkingDraft;