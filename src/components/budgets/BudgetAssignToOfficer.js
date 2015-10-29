import React from 'react';
import InputMaterial from '../InputMaterial';
import SelectMaterial from '../SelectMaterial';
import InputFileMaterial from '../InputFileMaterial';
import TextareaMaterial from '../TextareaMaterial';
import {mapObject} from './../../utilities';
import Select2 from '../Select2';
import Fluxxor from 'fluxxor';
var FluxMixin = Fluxxor.FluxMixin(React)

var BudgetAssignToOfficer = React.createClass({
	mixins: [FluxMixin],
	getInitialState: function(){

		return {
			status: '',
			responsibleOfficer: [],
			officersToNotify: [],
			message: '',
			budgetCutId: this.props.id,
			showMessage: false
		}
	},
	getReponsibleOfficers: function(){
		
		return {
			options: [
                { value: 'one', label: 'One' },
                { value: 'two', label: 'Two' }
            ]
		}
	},
	onSave: function(){

		this.getFlux().actions.BudgetActions.assignToOfficer(this.state);

		this.setState({
			status: '',
			responsibleOfficer: [],
			officersToNotify: [],
			message: '',
			showMessage: true
		})
	},
	render: function(){


		return (
			<div className="assign-form">
				<h4>Assign to officer</h4>

				{this.state.showMessage? 
				<div className ="alert alert--success">
					Assign notifications has been sent to the users
				</div>
				: null}
				
				<SelectMaterial label = 'Select action' onChange = { (event) => {

					this.setState({
						status: event.target.value
					})
				}} >
					{mapObject(AppConfig.STATUS_MAPPING, (status, idx) => {
						return <option key = {idx}>{status}</option>
					})}
				</SelectMaterial>

				<Select2  
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_RESPONSIBLE_OFFICERS} 
					placeholder= 'Responsible officers'
					multiple = {true}
					onChange = { (val) => {
						
						this.setState({
							responsibleOfficer: val
						})
					}}
				/>

				<Select2  
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_OFFICERS_TO_NOTIFY} 
					placeholder= 'Officers to notify'
					multiple = {true}
					onChange = { (val) => {
						
						this.setState({
							officersToNotify: val
						})
					}}
				/>
				
				<TextareaMaterial label="Message" rows = {1} onChange = { (event) => {
					this.setState({
						message: event.target.value
					})
				}} />

				<div className="form-control submit-control">
					<button className="btn btn-primary" onClick = {this.onSave}>Save</button>
					<a className="btn btn--unstyled">Cancel</a>
				</div>
			</div>
		)
	}
});

module.exports = BudgetAssignToOfficer;