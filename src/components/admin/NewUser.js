import React from 'react';
import Select2 from '../Select2';
import InputMaterial from '../InputMaterial';
import {mapObject} from './../../utilities';
import {validationOptions} from './../../constants';
import _ from 'lodash';

var USER_GROUPS = AppConfig.ROLES.filter( (role) => role.showInCreateUser);

var NewUser = React.createClass({	
	getInitialState: function(){

		return {
			user: this.props.user || {},
			type: 'user',
			name: '',
			email: '',
			memberOfParliament: '',
			hodDrafting: ''
		}
	},
	onSave: function(e){

		if(this.$form.valid()){			

			event && event.preventDefault();

			var {user, 
				type, 
				name, 
				email, 
				memberOfParliament,
				hodDrafting,
				} = this.state,
				params = {};

			switch(type){
				case 'user':
					params = {
						user: user.id,
						roles: user.role,
						type: type,
						userId: CURRENT_USER.id
					}
					break;

				case 'mp':
					params = {
						name: name,
						email: email,
						type: type,
						userId: CURRENT_USER.id
					}
					break;

				case 'hod':
					params = {
						user: user.id,						
						memberOfParliament: memberOfParliament,
						type: type,
						roles: ['Head of Department'],
						userId: CURRENT_USER.id
					}
					break;

				case 'liasonOfficer':
					params = {
						user: user.id,						
						hodDrafting: hodDrafting,
						type: type,
						roles: ['Liaison Officers'],
						userId: CURRENT_USER.id
					}
					break;
			}

			this.props.flux.actions.AdminActions.addUser(params, () => {

				this.props.closeModal && this.props.closeModal.call(this)
			})
		}

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
	isRoleChecked: function(role){
		var {user} = this.state;
		
		var roles = user.role? user.role : []
		
		return roles.indexOf(role) != -1
	},
	addRole: function(value, event){

		var user = _.clone(this.state.user);

		if(!user.role){
			alert('Please select a user first.');

			return event.preventDefault();
		}

		user.role.push(value);

		this.setState({
			user: user
		})

	},
	removeRole: function(value){

		var user = _.clone(this.state.user);

		user.role.splice(user.role.indexOf(value), 1);

		this.setState({
			user: user
		})

	},
	render: function(){

		var {user, type} = this.state;
		
		var formContent = null;

		switch(type){
			case 'user':
				formContent = this.renderUsers();
				break;

			case 'mp':
				formContent = this.renderMps();
				break;

			case 'hod':
				formContent = this.renderHods();
				break;

			case 'liasonOfficer':
				formContent = this.renderLiason();
				break;
		}
		
		return (
			<div className="modal-dialog">
				<div className="modal-dialog-title">
					Add user
				</div>
				<form className="modal-dialog-body" ref="form">

					<Select2
						placeholder="Select user type"						
						onChange = {(val) => {
							this.setState({
								type: val
							})
						}}
						>
						<option></option>
						<option value = 'user' selected>Normal user</option>
						<option value = 'mp'>MP</option>
						<option value = 'hod'>HOD</option>
						<option value = 'liasonOfficer'>Liason Officer</option>
					</Select2>

					{formContent}

					<div className="form-control submit-control">
						<button className="btn btn-primary" onClick = {this.onSave}>Save</button>
						<a onClick = {this.props.closeModal} className="btn btn--unstyled">Cancel</a>
					</div>

				</form>
			</div>
		)
	},
	renderUsers: function(){

		return (
			<div>
				<Select2
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_ALL_USERS} 
					placeholder= 'Enter name or email address...'					
					required = {true}
					name="email"
					onChange = { (val, data, event) => {

						this.setState({
							user: data
						})
													
						this.checkSelect2Valid(event);

					}}
					formatResult = {(result) => {
						return '<div>' + result.name + '<br /><small>' + result.email + '</small></div>'
					}}
				/>

				{this.renderRoles()}
			</div>)
	},
	renderMps: function(){

		return (
			<div>
				<InputMaterial
					label="Name"
					onChange = {(event) => {
						this.setState({
							name: event.target.value
						})
					}}
					/>

				<InputMaterial
					label="Email"
					onChange = {(event) => {
						this.setState({
							email: event.target.value
						})
					}}
					/>
			</div>
		)
	},
	renderHods: function(){
		return (
			<div>
				<Select2
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_ALL_USERS} 
					placeholder= 'Enter name or email address...'					
					required = {true}
					name="email"
					onChange = { (val, data, event) => {

						this.setState({
							user: data
						})
													
						this.checkSelect2Valid(event);

					}}
					formatResult = {(result) => {
						return '<div>' + result.name + '<br /><small>' + result.email + '</small></div>'
					}}
				/>

				<Select2  
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_MPS} 
					placeholder= 'Member of Parliament'
					multiple = {false}
					required = {true}
					name="memberOfParliament"
					onChange = { (val, data, event) => {

						this.checkSelect2Valid(event);
						
						this.setState({
							memberOfParliament: val
						})
					}}
				/>
			</div>
		)
	},
	renderLiason: function(){
		
		return (
			<div>
				<Select2
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_ALL_USERS} 
					placeholder= 'Enter name or email address...'					
					required = {true}					
					name = 'users'
					onChange = { (val, data, event) => {

						this.setState({
							user: data
						})
													
						this.checkSelect2Valid(event);

					}}
					formatResult = {(result) => {
						return '<div>' + result.name + '<br /><small>' + result.email + '</small></div>'
					}}
				/>
				<span className="js-hide">s</span>
				<Select2  
						url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_HOD_DRAFTING_USER} 
						placeholder= 'HOD Drafting'
						multiple = {false}
						name="hodDrafting"
						required = {true}						
						onChange = { (val, data, event) => {

							this.checkSelect2Valid(event);
							
							this.setState({
								hodDrafting: val
							})
						}}
					/>

				
			</div>
		)
	},
	renderRoles: function(){

		return (
			<div className="form-control">
				<label>Select user group</label>
				{USER_GROUPS.map( (group, idx) => {

					return (
					<label className="label-checkbox label-block" key = {idx}>
						<input 
							type="checkbox" 
							name="groups" 
							value = {group.name}
							onChange = {(event) => {

								var value = event.target.value;

								if(event.target.checked){
									this.addRole(value, event)
								}else{
									this.removeRole(value, event)
								}
							}}
							checked = {this.isRoleChecked(group.name)}
							required 
						/>
						{group.name}
					</label>
					)
				})}
			</div>
		)
	}
});


module.exports = NewUser