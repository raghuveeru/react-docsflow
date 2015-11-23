import React from 'react';
import {Link} from 'react-router';
import {mapObject, getStatusName} from './../../utilities';
import Fluxxor from 'fluxxor';
var FluxMixin = Fluxxor.FluxMixin(React)

var BudgetInnerGroup = React.createClass({
	mixins: [FluxMixin],
	getInitialState: function(){

		var {openStatus, grp} = this.props;

		return {
			isOpen: openStatus.indexOf(grp.name) != -1
		}
	},
	toggleGroup: function(name){

		var isOpen = !this.state.isOpen;

		this.setState({
			isOpen: isOpen
		})

		this.props.flux.actions.BudgetActions.setBudgetOpenStatus(name, isOpen)
	},
	render: function(){
		
		var {grp} = this.props;
		var klassName = 'budget-list-item' + (this.state.isOpen? ' inner-group-open' : ' inner-group-closed');

		var toggleBound = this.toggleGroup.bind(this, grp.name)

		return (
			<div className={klassName}>
				<h3 className="budget-group-title-inner" onClick = {toggleBound}>{grp.name}</h3>

				{grp.items.map((item, index) => {

				var statusIdx = 5;
				var memberOfParliament = item.memberOfParliament? item.memberOfParliament.name : '';
				var hodSourcing = item.hodSourcing? item.hodSourcing.name : '';
				var hodDrafting = item.hodDrafting? item.hodDrafting.name : '';
				var liasonOfficer = item.liasonOfficer? item.liasonOfficer.name : '';

				var showCheckbox = (item.status.toLowerCase() == 'final draft');
				var statusText = (item.status.toLowerCase() == 'speech')? <span className="budget-item-status" style = {{backgroundColor: getStatusName(item.status).color}}>{getStatusName(item.status).name}</span> : null;

				var {completedStatus} = item;
				var completedStatus = completedStatus? completedStatus.map( (status) => status.toLowerCase()) : [];
				
				return (
					<Link to = 'budgetsView' params={{id: item.id}} className="budget-list-item-inner" key = {index}>					
						{statusText}
						{showCheckbox? 
						<input 
							type="checkbox" 
							className="budget-item-checkbox"  
							onClick = {(event) =>{
								
								event.stopPropagation();

								this.getFlux().actions.BudgetActions.selectBudget(item.id, event.target.checked)
							}}
							readOnly = {true}
							checked = {item.checked}
						/>
						: null}
						
						<p  className="budget-item-summary">{item.summary}</p>

						<table className="table table-budget-item">
							<tbody>
								<tr>
									<th>Member of Parliament</th>
									<td>{memberOfParliament}</td>
								</tr>
								<tr>
									<th>HOD Sourcing</th>
									<td>{hodSourcing}</td>
								</tr>
								<tr>
									<th>HOD Drafting</th>
									<td>{hodDrafting}</td>
								</tr>
								<tr>
									<th>Liason officer</th>
									<td>{liasonOfficer}</td>
								</tr>
							</tbody>
						</table>
						<div className="status-trail">
							{AppConfig.STATUS_MAPPING.map((status, idx) => {		
								var completedS = completedStatus || []
								
								var isCompleted = completedS.indexOf(status.name.toLowerCase()) != -1;
								var statusClassName = 'status-trail-item' + (isCompleted? ' active' : ' inactive')
								return (
									<span className={statusClassName} key = {idx}>{status.name}</span>
								)
							})}
						</div>
					</Link>)
				})}
			</div>
		)
	}
});


module.exports = BudgetInnerGroup;