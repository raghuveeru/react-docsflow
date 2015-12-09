import React from 'react';
import InputMaterial from '../InputMaterial';
import Select2 from './../Select2';
import TextareaMaterial from '../TextareaMaterial';
import {mapObject, t, checkForPermission, checkSelect2Valid} from './../../utilities';
import {validationOptions} from './../../constants';
import {Link} from 'react-router';
import Fluxxor from 'fluxxor';
import {StoreWatchMixin} from 'fluxxor';
var FluxMixin = Fluxxor.FluxMixin(React);

var defaultStatus = AppConfig.STATUS_MAPPING.filter( (status) => status.defaultStatus).map( (item) => item.name)

var BudgetNew = React.createClass({	
	mixins: [FluxMixin, StoreWatchMixin('BudgetStore')],
	getStateFromFlux: function(){

		return {
			BudgetStore: this.getFlux().store('BudgetStore').getState()
		}
	},
	contextTypes: {
		router: React.PropTypes.func,
		currentUser: React.PropTypes.object
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
			hodOfficers: [],
			fileReferenceNo: '',
			summary: '',
			time: '',
			status: defaultStatus[0],
			responsibleOfficer: [],
			officersToNotify: [],
			message: '',
			userId: this.context.currentUser.id,
			subject: ''
		}
	},
	create: function(event){

		if(this.props.params.id) return this.update(event)

		if(this.$form.valid()){			

			event && event.preventDefault();

			var data = this.getData();

			this.props.flux.actions.BudgetActions.createNew(data, (response) => {
				
				var res = response.data[0];

				if(!res || !res.id){
					throw new Error('Please check the response of this API Call - new-budget-cut-response.json');
				}
				this.context.router.transitionTo('budgetsView', {'id': res.id})
			})
		}
	},
	getData: function(){

		return {			
			topicId: this.state.topicId,
			budgetCutId: this.state.budgetCutId,
			memberOfParliament: this.state.memberOfParliament,
			hodSourcing: this.state.hodSourcing,
			fileReferenceNo: this.state.fileReferenceNo,
			summary: this.state.summary,
			time: this.state.time,
			responsibleOfficer: this.state.responsibleOfficer,
			officersToNotify: this.state.officersToNotify,
			message: this.state.message,
			userId: this.context.currentUser.id,
			subject: this.state.subject,
			status: this.state.status
		}
	},
	update: function(event){

		event && event.preventDefault();

		if(this.$form.valid()){
			
			var {currentBudget} = this.state.BudgetStore;
			
			var data = {
				id: currentBudget.id,
				topicId: this.state.topicId || currentBudget.topic.id,
				budgetCutId: this.state.budgetCutId || currentBudget.budgetCutTopic.id,
				memberOfParliament: this.state.memberOfParliament || currentBudget.memberOfParliament.id,
				hodSourcing: this.state.hodSourcing || currentBudget.hodSourcing.id,
				fileReferenceNo: this.state.fileReferenceNo || currentBudget.fileReferenceNo,
				summary: this.state.summary || currentBudget.summary,
				time: this.state.time || currentBudget.time,
				userId: this.context.currentUser.id
			}

			
			this.props.flux.actions.BudgetActions.updateBudgetCut(data, (response) => {
				
				var res = response.data[0];

				if(!res || !res.id){
					throw new Error('Please check the response of this API Call - new-budget-cut-response.json');
				}
				this.context.router.transitionTo('budgetsView', {'id': res.id})
			})

			

		}
	},
	updateSubject: function(){	

		var {status} = this.state;

		var sub = t(AppConfig.SUBJECT_TEMPLATE, {
			status: status? status + ' - ': '',
			topic: this.state.budgetCutTopicName,
			mp: this.state.memberOfParliamentName
		});

		this.setState({
			subject: sub
		})
	},
	componentDidUpdate: function(nextProps, nextState){

		var {currentBudget} = this.state.BudgetStore;
		
		if(this.props.params.id && currentBudget.id){
			this.$form = $(this.refs.form.getDOMNode());

			this.$form.validate(validationOptions);
		}
	},
	componentDidMount: function(){

		
		if(!this.props.params.id){

			this.$form = $(this.refs.form.getDOMNode());

			this.$form.validate(validationOptions);
		}

		/**
		 * Check if its in editMode
		 */
		
		if(this.props.params.id){

			/**
			 * Check if the user has permission
			 */
			
			if(!checkForPermission('canEditDeleteBudgetCut')){

				this.context.router.transitionTo('budgets')
			}


			/**
			 * Get Budget cut
			 */
			
			this.getFlux().actions.BudgetActions.getBudgetById({
				id: this.props.params.id
			})
		}

	},	
	render: function(){
		var {currentBudget} = this.state.BudgetStore;
		var isEditMode = !!this.props.params.id;		

		if(!isEditMode) currentBudget = {};

		var AssignTo = !isEditMode? this.renderAssignToOfficer() : null;
		var buttonTitle = !isEditMode? 'Create and assign': 'Submit';		
		var title = !isEditMode? 'Create new budget cut' : 'Edit budget cut';
		
		/* Handle for edit and no Id */

		if(isEditMode && !currentBudget.id) return null;

		return (
			<form ref="form">
				<nav className="nav-crumb">
					<Link to = "home">
						<em className="fa fa-home" />
					</Link>
				</nav>
				<h1>{title}</h1>
				<div className="sp-card">
					<div className="card-body">

						<Select2  
							url = {AppConfig.API.BASE_URL + AppConfig.API.TOPICS.GET_MAIN_TOPICS}
							required = {true}
							placeholder= 'Select topics'
							name="selectTopic"
							multiple = {false}
							defaultValue = {currentBudget.topic}
							onChange = { (val, data, event) => {

								var bcTopic = data.budgetCutTopic;

								
								checkSelect2Valid(event);
								
								this.setState({
									topicId: val,
									budgetCutTopic: bcTopic									
								})
							}}
						/>
						
						<Select2
							url = {AppConfig.API.BASE_URL + AppConfig.API.TOPICS.GET_BUDGET_CUT_TOPICS}
							placeholder = 'Budget cut topic' 							
							ref = "budgetCutTopicSelect"							
							readOnly = {true}
							required = {true}
							name="budgetCutTopicSelect"
							query = {{ topicId: this.state.topicId}}
							defaultValue = {currentBudget.budgetCutTopic}
							onChange = { (val, data, event) => {
								
								checkSelect2Valid(event);
								
								this.setState({
									budgetCutId: val,
									budgetCutTopicName: data.name
								}, this.updateSubject)
							}}
						 />
						

						<Select2  
							url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_MPS} 
							placeholder= 'Member of Parliament'
							multiple = {false}
							required = {true}
							name="memberOfParliament"
							defaultValue = {currentBudget.memberOfParliament}
							onChange = { (val, data, event) => {

								checkSelect2Valid(event);								
								
								var select = this.refs.hodSourcingSelect.refs.select.getDOMNode();

								if(data.hodOfficer.length){
									
									setTimeout(() => {
										$(select).select2('data', data.hodOfficer[0], true)
									}, 100)
								
								}else{
									
									setTimeout(() => {
										$(select).select2('data', null)
									}, 100)
								}

								this.setState({
									memberOfParliament: val,
									memberOfParliamentName: data.name,
									hodOfficers: data.hodOfficer
								}, this.updateSubject)
							}}
						/>

						<Select2  
							url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_HOD_SOURCING_USER} 
							placeholder= 'HOD Sourcing'
							multiple = {false}
							ref = 'hodSourcingSelect'
							name="hodSourcing"
							required = {true}
							defaultValue = {currentBudget.hodSourcing}
							query = {{ memberOfParliament: this.state.memberOfParliament}}
							onChange = { (val, data, event) => {

								checkSelect2Valid(event);
								
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
									defaultValue = {currentBudget.fileReferenceNo}
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
								<TextareaMaterial
									rows = {1} 
									required = {true}
									name="summary"
									label = "Gist of cuts" 
									defaultValue = {currentBudget.summary}
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
									className="number"									
									defaultValue = {currentBudget.time}
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


						{AssignTo}
						

						<div className="form-control">
							<button className="btn btn-primary" onClick = {this.create}>{buttonTitle}</button>
							<a className="btn btn--unstyled" onClick = {() =>{

								if(isEditMode){
									return this.context.router.transitionTo('budgetsView', {id: currentBudget.id})	
								}

								this.context.router.transitionTo('budgets')

							}}>Cancel</a>
						</div>

					</div>
				</div>
			</form>
		)
	},
	renderAssignToOfficer: function(){

		return (
			<div className="form-control">
				<h4>Assign to officer</h4>

				<Select2 
					placeholder="Select status"
					label = 'Select action'
					value = {this.state.status}
					required = {true}
					onChange = { (val, data, event) => {

						checkSelect2Valid(event);
						
						this.setState({
							status: val
						}, this.updateSubject)
					}} >
					<option></option>
					{AppConfig.STATUS_MAPPING.map((status, idx) => {
						return <option key = {idx}>{status.name}</option>
					})}
				</Select2>

				<Select2  
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_RESPONSIBLE_OFFICERS} 
					required = {true}
					placeholder= 'To'
					multiple = {true}
					query = {{role: 'COSCoordinator', groups: 'true'}}
					name="responsibleOfficer"
					onChange = { (val, data, event) => {

						checkSelect2Valid(event);
						
						this.setState({
							responsibleOfficer: val
						})
					}}
				/>

				<Select2  
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_OFFICERS_TO_NOTIFY} 
					placeholder= 'CC'
					multiple = {true}
					name="officersToNotify"
					query = {{groups: 'true'}}
					onChange = { (val) => {
						
						this.setState({
							officersToNotify: val
						})
					}}
				/>

				<div className="row">
					<div className="columns six">

						<TextareaMaterial
							label="Subject"
							rows = {1}
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
				
			</div>
		)
	}
})

module.exports = BudgetNew