import React from 'react';
import Select2 from '../Select2';
import SelectMaterial from '../SelectMaterial';
import {mapObject} from './../../utilities';

var NewUser = React.createClass({		
	render: function(){
		
		return (
			<div className="modal-dialog">
				<div className="modal-dialog-title">
					Add user
				</div>
				<div className="modal-dialog-body">

					<Select2
						url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_ALL_USERS} 
						placeholder= 'Enter name or email address...'
						allowClear = {true}
						onChange = { (val) => {
							console.log('val')
						}}
					/>

					<Select2  
						url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_RESPONSIBLE_OFFICERS} 
						placeholder= 'Select MP'
						multiple = {false}
						onChange = { (val) => {
							
							this.setState({
								responsibleOfficer: val
							})
						}}
					/>

					<Select2  
						url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_OFFICERS_TO_NOTIFY} 
						placeholder= 'HOD drafting reply'
						multiple = {false}
						onChange = { (val) => {
							
							this.setState({
								officersToNotify: val
							})
						}}
					/>

					<div className="form-control">
						<label>Select user group</label>
						{mapObject(AppConfig.ROLE_PERMISSION_MAPPING, (key, value, idx) => {

							return (
							<label className="label-checkbox label-block" key = {idx}>
								<input type="checkbox" name="groups" value = {key} />
								{key}
							</label>
							)
						})}
					</div>

					<div className="form-control submit-control">
						<button className="btn btn-primary" onClick = {this.onSave}>Save</button>
						<a onClick = {this.props.closeModal} className="btn btn--unstyled">Cancel</a>
					</div>

				</div>
			</div>
		)
	}
});


module.exports = NewUser