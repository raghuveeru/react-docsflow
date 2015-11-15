import React from 'react';
import InputMaterial from '../InputMaterial';
import InputFileMaterial from '../InputFileMaterial';
import TextareaMaterial from '../TextareaMaterial';
import {mapObject, t} from './../../utilities';
import {validationOptions} from './../../constants';
import Select2 from '../Select2';
import Fluxxor from 'fluxxor';
var FluxMixin = Fluxxor.FluxMixin(React);

var BudgetAssignToOfficer = React.createClass({
	mixins: [FluxMixin],
	getInitialState: function(){

		return {
			status: '',
			responsibleOfficer: [],
			officersToNotify: [],
			message: '',
			subject: '',
			budgetCutId: this.props.id,			
			userId: CURRENT_USER.id
		}
	},
	onSave: function(event){

		if(this.$form.valid()){

			event && event.preventDefault();

			this.getFlux().actions.BudgetActions.assignToOfficer(this.state, () => {

				this.getFlux().actions.BudgetActions.getBudgetActivity(this.props.id)

				this.setState({
					status: '',
					responsibleOfficer: [],
					officersToNotify: [],
					message: '',					
					subject: ''
				})
			});			
		}
	},
	updateSubject: function(){		

		var {memberOfParliament} = this.props.budget;
		var mp = memberOfParliament?  memberOfParliament.name : '';

		var sub = t(AppConfig.SUBJECT_TEMPLATE, {
			status: this.state.status,
			topic: this.props.budget.title,
			mp: mp
		});

		this.setState({
			subject: sub
		})
	},
	componentDidMount: function(){

		this.$form = $(this.refs.form.getDOMNode());

		this.$form.validate(validationOptions);

	},
	checkSelect2Valid: function(e){
		
		if(!e) return;

		if(this.$form.data('validator') == null) return;

		var $ele = $(e.target);		
		
		return $ele.valid();
		
	},
	render: function(){

		return (
			<form ref="form" className="assign-form">
				<h4>Assign to officer</h4>
				
				<Select2
					placeholder = 'Select action' 
					required = {true}
					onChange = { (val, data, event) => {

						this.checkSelect2Valid(event)

						this.setState({
							status: val
						}, this.updateSubject);

				}} >
					<option></option>
					{mapObject(AppConfig.STATUS_MAPPING, (status, idx) => {
						return <option key = {idx}>{status}</option>
					})}
				</Select2>

				<Select2  
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_RESPONSIBLE_OFFICERS}
					required = {true}
					placeholder= 'Responsible officers'
					multiple = {true}
					name="responsibleOfficer"
					onChange = { (val, data, event) => {

						this.checkSelect2Valid(event)
						
						this.setState({
							responsibleOfficer: val
						})
					}}
				/>

				<Select2  
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_OFFICERS_TO_NOTIFY} 
					placeholder= 'Officers to notify'
					multiple = {true}
					required = {true}
					name="officersToNotify"
					onChange = { (val, data, event) => {
						
						this.checkSelect2Valid(event)

						this.setState({
							officersToNotify: val
						})
					}}
				/>

				<InputMaterial
					required = {true}
					label="Subject"
					name="subject"
					value = {this.state.subject}
					readOnly = {true}
					/>
				
				<TextareaMaterial 
					label="Message" 
					required = {true}
					name="message"
					rows = {1} onChange = { (event) => {
					this.setState({
						message: event.target.value
					})
				}} />

				<div className="form-control submit-control">
					<button className="btn btn-primary" onClick = {this.onSave}>Save</button>
					<a className="btn btn--unstyled">Cancel</a>
				</div>
			</form>
		)
	}
});

module.exports = BudgetAssignToOfficer;