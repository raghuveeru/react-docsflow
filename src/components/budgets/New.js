import React from 'react';
import InputMaterial from '../InputMaterial';
import Select2 from '../Select2';
import TextareaMaterial from '../TextareaMaterial';
import {mapObject, t} from './../../utilities';
import {validationOptions} from './../../constants';

var BudgetNew = React.createClass({	
	contextTypes: {
		router: React.PropTypes.func
	},
	goBack: function(){
		this.context.router.transitionTo('budgetsInbox', {type: 'inbox'})	
	},
	getInitialState: function(){
		
		return {			
			topicId: '',
			budgetCutId: '',
			budgetCutTopic: [],
			budgetCutTopicName: '',
			memberOfParliament:'',
			memberOfParliamentName: '',
			hodSourcing: '',
			fileReferenceNo: '',
			summary: '',
			time: '',
			status: '',
			responsibleOfficer: [],
			officersToNotify: [],
			message: '',
			userId: CURRENT_USER.id,
			subject: ''
		}
	},
	create: function(event){

		if(this.$form.valid()){			

			event && event.preventDefault();

			this.props.flux.actions.BudgetActions.createNew(this.state, (response) => {
				
				var res = response.data[0];

				if(!res || !res.id){
					throw new Error('Please check the response of this API Call - new-budget-cut-response.json');
				}
				this.context.router.transitionTo('budgetsView', {'id': res.id})
			})
		}
	},
	updateSubject: function(){		

		var sub = t(AppConfig.SUBJECT_TEMPLATE, {
			status: this.state.status,
			topic: this.state.budgetCutTopicName,
			mp: this.state.memberOfParliamentName
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
		var $ele = $(e.target);
		
		return $ele.valid();
	},
	render: function(){

		return (
			<form ref="form">
				<h1>Create new budget cut</h1>
				<div className="sp-card">
					<div className="card-body">

						<Select2  
							url = {AppConfig.API.BASE_URL + AppConfig.API.TOPICS.GET_MAIN_TOPICS}
							required = {true}
							placeholder= 'Select topics'
							name="selectTopic"
							multiple = {false}
							onChange = { (val, data, event) => {

								var bcTopic = data.budgetCutTopic;

								var select = this.refs.budgetCutTopicSelect.refs.select.getDOMNode();
								
								setTimeout(() => {
									$(select).select2('val', bcTopic[0].id, true)
								}, 100)

								this.checkSelect2Valid(event);
								
								this.setState({
									topicId: val,
									budgetCutTopic: bcTopic,
									budgetCutTopicName: bcTopic[0].name
								})
							}}
						/>
						
						<Select2 
							placeholder = 'Budget cut topic' 							
							ref = "budgetCutTopicSelect"							
							readOnly = {true}
							required = {true}
							name="budgetCutTopicSelect"
							onChange = { (val, data, event) => {

								this.checkSelect2Valid(event);
								
								this.setState({
									budgetCutId: val
								})
							}}
						>
							<option></option>
							{this.state.budgetCutTopic.map((topic, idx) => {
								return <option value= {topic.id} key = {idx}>{topic.name}</option>
							})}
						</Select2>

						<Select2  
							url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_MPS} 
							placeholder= 'Member of Parliament'
							multiple = {false}
							required = {true}
							name="memberOfParliament"
							onChange = { (val, data, event) => {

								this.checkSelect2Valid(event);
								
								this.setState({
									memberOfParliament: val,
									memberOfParliamentName: data.name
								}, this.updateSubject)
							}}
						/>

						<Select2  
							url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_HOD_SOURCING_USER} 
							placeholder= 'HOD Sourcing'
							multiple = {false}
							name="hodSourcing"
							required = {true}
							onChange = { (val, data, event) => {

								this.checkSelect2Valid(event);
								
								this.setState({
									hodSourcing: val
								})
							}}
						/>

						
						<div className="row">
							<div className="columns six">
								<InputMaterial 
									label = "File reference no. (optional)" 
									name = "fileReferenceNo"
									required = {true}
									onChange = {
										(event) => {
											
											this.setState({
												fileReferenceNo: event.target.value
											})
										}
								} />
							</div>
						</div>

						<div className="row">
							<div className="columns six">
								<InputMaterial 
									required = {true}
									name="summary"
									label = "Gist of cuts" 
									onChange = {
										(event) => {
											
											this.setState({
												summary: event.target.value
											})
										}
									}
								/>
							</div>
						</div>

						<div className="row">
							<div className="columns six">
								<InputMaterial
									name="time" 
									required = {true}
									label = "Time for MP to speak (min)" 
									onChange = {
										(event) => {
											
											this.setState({
												time: event.target.value
											})
										}
									}
								/>
							</div>
						</div>


						<div className="form-control">
							<h4>Assign to officer</h4>

							<Select2 
								label = 'Select action' onChange = { (val) => {
								
								this.setState({
									status: val
								}, this.updateSubject)
							}} >
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
								name="officersToNotify"
								onChange = { (val) => {
									
									this.setState({
										officersToNotify: val
									})
								}}
							/>

							<div className="row">
								<div className="columns six">

									<InputMaterial
										label="Subject"
										value = {this.state.subject}
										readOnly = {true}
										/>
								</div>
							</div>

							<div className="row">
								<div className="columns six">
									
									<TextareaMaterial 
										name="message"
										required = {true}
										label="Message" 
										rows = {1} 
										onChange = { (event) => {
											this.setState({
												message: event.target.value
											})
									}} />
								</div>
							</div>

							<div className="form-control">
								<button className="btn btn-primary" onClick = {this.create}>Create and assign</button>
								<a className="btn btn--unstyled" onClick = {() =>{

									this.context.router.transitionTo('budgets')

								}}>Cancel</a>
							</div>
						</div>

					</div>
				</div>
			</form>
		)
	}
})

module.exports = BudgetNew