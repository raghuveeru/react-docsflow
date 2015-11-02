import React from 'react';
import InputMaterial from '../InputMaterial';
import SelectMaterial from '../SelectMaterial';
import Select2 from '../Select2';
import TextareaMaterial from '../TextareaMaterial';
import {mapObject} from './../../utilities';

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
			budgetCutTopicName: '',
			memberOfParliament:'',
			hodSourcing: '',
			fileReferenceNo: '',
			summary: '',
			time: '',
			status: '',
			responsibleOfficer: [],
			officersToNotify: [],
			message: '',
			userId: CURRENT_USER.id
		}
	},
	create: function(){

		this.props.flux.actions.BudgetActions.createNew(this.state, (response) => {
			
			var res = response.data[0];

			if(!res || !res.id){
				throw new Error('Please check the response of this API Call - new-budget-cut-response.json');
			}
			this.context.router.transitionTo('budgetsView', {'id': res.id})
		})
	},
	render: function(){

		return (
			<div>
				<h1>Create new budget cut</h1>
				<div className="sp-card">
					<div className="card-body">

						<Select2  
							url = {AppConfig.API.BASE_URL + AppConfig.API.TOPICS.GET_MAIN_TOPICS} 
							placeholder= 'Select topics'							
							multiple = {false}
							onChange = { (val, data) => {

								var bcTopic = data.budgetCutTopic;
								
								this.setState({
									topicId: val,
									budgetCutTopic: bcTopic.id,
									budgetCutTopicName: bcTopic.name
								})
							}}
						/>
						
						<InputMaterial 
							label = 'Budget cut topic' 
							className="select2-wide" 
							ref = "budgetCutTopic"
							value = {this.state.budgetCutTopicName}
							readOnly = {true}
						/>

						<Select2  
							url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_MPS} 
							placeholder= 'Member of Parliament'
							multiple = {false}
							onChange = { (val) => {
								
								this.setState({
									memberOfParliament: val
								})
							}}
						/>

						<Select2  
							url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_HOD_SOURCING_USER} 
							placeholder= 'HOD Sourcing'
							multiple = {false}
							onChange = { (val) => {
								
								this.setState({
									hodSourcing: val
								})
							}}
						/>

						
						<div className="row">
							<div className="columns six">
								<InputMaterial label = "File reference no. (optional)" onChange = {
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

							<div className="row">
								<div className="columns six">
									
									<TextareaMaterial label="Message" rows = {1} onChange = { (event) => {
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
			</div>
		)
	}
})

module.exports = BudgetNew