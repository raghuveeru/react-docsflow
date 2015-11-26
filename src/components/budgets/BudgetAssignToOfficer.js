import React from 'react';
import InputMaterial from '../InputMaterial';
import InputFileMaterial from '../InputFileMaterial';
import TextareaMaterial from '../TextareaMaterial';
import {mapObject, t, filterStatus} from './../../utilities';
import {validationOptions} from './../../constants';
import Select2 from '../Select2';
import Fluxxor from 'fluxxor';
var FluxMixin = Fluxxor.FluxMixin(React);

var BudgetAssignToOfficer = React.createClass({
	mixins: [FluxMixin],
	getInitialState: function(){

		return {			
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

		this.updateSubject();

	},
	checkSelect2Valid: function(e){
		
		if(!e) return;

		if(this.$form.data('validator') == null) return;

		var $ele = $(e.target);		
		
		return $ele.valid();
		
	},
	render: function(){

		var {budget} = this.props;

		return (
			<form ref="form" className="assign-form">
				<h4>Assign to officer</h4>
								

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

				<TextareaMaterial
					required = {true}
					label="Subject"
					name="subject"
					value = {this.state.subject}
					readOnly = {true}
					rows = {1}
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
					<button className="btn btn-primary" onClick = {this.onSave}>Submit</button>
					<a className="btn btn--unstyled">Cancel</a>
				</div>
			</form>
		)
	}
});

module.exports = BudgetAssignToOfficer;