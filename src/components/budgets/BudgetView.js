import React from 'react';
import {StoreWatchMixin} from 'fluxxor';
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

		if(!Object.keys(currentBudget).length) return null;

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
						<div className="sp-card">
							<div className="card-body">
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

								<p>lorem	</p>
							</div>
							
						</div>
					</div>
					<div className="sp-sidebar">
						<div className="sp-module">
							<h2 className="sp-module-title">Activity</h2>
							<div className="sp-module-content">
								<ul className="list-items list-user">
									{currentBudget.activity.map(function(activity){

										var fromUser = activity.from;
										var toUser = activity.to;

										return (
											<li>
												<div className="media-item">
													<img src = {fromUser.image} />
												</div>
												<div className="media-content">
													<strong>{fromUser.name}</strong> {activity.action} to {toUser.role} <strong>{toUser.name}</strong>

													<div className="activity-meta">{activity.date}</div>
												</div>
											</li>
										)
									})}
									
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = BudgetView