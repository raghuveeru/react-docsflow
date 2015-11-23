import React from 'react';
import Select2 from '../Select2';
import InputMaterial from '../InputMaterial';
import {mapObject} from './../../utilities';
import {validationOptions} from './../../constants';
import _ from 'lodash';

var USER_GROUPS = AppConfig.ROLES;
var DEPARTMENTS = AppConfig.DEPARTMENTS;

var NewUser = React.createClass({	
	getInitialState: function(){

		return {
			user: this.props.user || {},
			type: 'user',
			name: '',
			email: '',			
			department: '',
			roles: [],
			id: ''
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
				roles,
				department,
				id
				} = this.state,
				params = {};

			switch(type){
				case 'user':
					params = {
						id: id,						
						type: type,
						userId: CURRENT_USER.id,
						roles: roles,
						department: department
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

		var roles = _.clone(this.state.roles);

		roles.push(value);

		this.setState({
			roles: roles
		})

	},
	removeRole: function(value){

		var roles = _.clone(this.state.roles);

		roles.splice(roles.indexOf(value), 1);

		this.setState({
			roles: roles
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
						<option value = 'user' selected>MOM Officer</option>
						<option value = 'mp'>MP</option>						
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

				{this.renderDepartments()}

				<Select2
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_ALL_USERS} 
					placeholder= 'Enter name or email address...'					
					required = {true}
					query = {{'department': this.state.department}}
					name="email"
					onChange = { (val, data, event) => {

						this.setState({
							id: val
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
	renderDepartments: function(){

		return (
			<div className="form-control">				
				<Select2
					placeholder="Select department"
					onChange = {(val) =>{
						this.setState({
							department: val
						})
					}}
				>
				{DEPARTMENTS.map( (dept, idx) => {
					return <option>{dept}</option>
				})}
				</Select2>
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
							value = {group.id}							
							onChange = {(event) => {

								var value = event.target.value;

								if(event.target.checked){
									this.addRole(value, event)
								}else{
									this.removeRole(value, event)
								}
							}}
							// checked = {this.isRoleChecked(group.name)}
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