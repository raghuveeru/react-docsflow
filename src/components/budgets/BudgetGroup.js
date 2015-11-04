import React from 'react';
import Fluxxor from 'fluxxor';
import _ from 'lodash';
import {Link} from 'react-router';
import {mapObject, getStatusName} from './../../utilities';
var FluxMixin = Fluxxor.FluxMixin(React)

var BudgetGroup = React.createClass({
	mixins: [FluxMixin],
	getInitialState: function(){

		return {
			isOpen: true
		}
	},
	toggleGroup: function(){

		this.setState({
			isOpen: !this.state.isOpen
		})
	},
	render: function(){

		var {group} = this.props;
		var klassName = 'group' + (this.state.isOpen? ' group-open' : ' group-closed');

		return (
			<div className={klassName}>
				
				<h3 className="budget-group-title" onClick = {this.toggleGroup}>{group.name} ({group.items.length})</h3>
											
				{group.items.map((item, index) => {

					var statusIdx = 5;
					
					return (
						<div key = {index} className="budget-list-item">
							<span className="budget-item-status">{getStatusName(item.status)}</span>
							<input 
								type="checkbox" 
								className="budget-item-checkbox"  
								onClick = {(event) =>{
									
									this.getFlux().actions.BudgetActions.selectBudget(item.id, event.target.checked)
								}}
								checked = {item.checked}
							/>
							<h4 className="budget-item-title">
								<Link to = 'budgetsView' params={{id: item.id}}>{item.title}</Link>
							</h4>
							<p  className="budget-item-summary">{item.summary}</p>

							<table className="table table-budget-item">
								<tbody>
									<tr>
										<th>Member of Parliament</th>
										<td>{item.memberOfParliament}</td>
									</tr>
									<tr>
										<th>HOD Sourcing</th>
										<td>{item.hodSourcing}</td>
									</tr>
									<tr>
										<th>HOD Drafting</th>
										<td>{item.hodDrafting}</td>
									</tr>
									<tr>
										<th>Liason officer</th>
										<td>{item.liasonOfficer}</td>
									</tr>
								</tbody>
							</table>
							<div className="status-trail">
								{mapObject(AppConfig.STATUS_MAPPING, function(key, value, idx){		

									if(key.toLowerCase() == item.status.toLowerCase()){
										statusIdx = idx;
									}
									
									var statusClassName = 'status-trail-item' + (key == item.status? ' active' : '') + (idx > statusIdx? ' inactive': '');
									return (
										<span className={statusClassName} key = {idx}>{key}</span>
									)
								})}
							</div>
					</div>)
				})}
			</div>
		)
	}
});

module.exports = BudgetGroup;