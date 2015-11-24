import React from 'react';
import Select2 from '../Select2';
import {validationOptions} from './../../constants';

var NewMapping = React.createClass({
	getInitialState: function(){

		var {selectedMapping, selectedMappingType} = this.props;
		
		return {
			id: selectedMapping.id || '',
			mappingType: selectedMappingType || '',
			memberOfParliament: selectedMapping.memberOfParliament || '',
			hod: selectedMapping.hod || '',
			hodsMp: selectedMapping.hods || [],
			liasonOfficers: selectedMapping.liasonOfficers || []
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
	onSave: function(){

		var {
			mappingType,
			memberOfParliament,
			hodsMp,
			id,
			hod,
			liasonOfficers
		} = this.state;

		var {
			selectedMapping
		} = this.props;

		/* Check if its edit or create */

		var isEditing = !!selectedMapping.id;		

		if(this.$form.valid()){			

			event && event.preventDefault();

			/**
			 * For create
			 */
			
			switch(parseInt(mappingType)){

				case 1:			

					if(isEditing){

						var _hodsMp = hodsMp.map( (item) => item.id? item.id.toString() : item.toString());

						this.props.flux.actions.AdminActions.updateMappingMpToHods({
							id: id,
							userId: CURRENT_USER.id,
							memberOfParliament: memberOfParliament.id,
							hods: _hodsMp
						}, () => {

							this.props.closeModal && this.props.closeModal.call(this)
						})

					}else{

						this.props.flux.actions.AdminActions.createMappingMpToHods({
							userId: CURRENT_USER.id,
							memberOfParliament: memberOfParliament.id,
							hods: hodsMp
						}, () => {

							this.props.closeModal && this.props.closeModal.call(this)
						})
					}

					break;

				case 2:

					if(isEditing){

						var _liasonOfficers = liasonOfficers.map( (item) => item.id? item.id.toString() : item.toString());

						this.props.flux.actions.AdminActions.updateMappingHodToLiasons({
							id: id,
							userId: CURRENT_USER.id,
							hod: hod.id,
							liasonOfficers: _liasonOfficers
						}, () => {

							this.props.closeModal && this.props.closeModal.call(this)
						})

					}else{

						this.props.flux.actions.AdminActions.createMappingHodToLiasons({
							userId: CURRENT_USER.id,
							hod: hod.id,
							liasonOfficers: liasonOfficers
						}, () => {

							this.props.closeModal && this.props.closeModal.call(this)
						})
					}

					break;
			}

		}
	},
	renderMpHods: function(){

		var {selectedMapping} = this.props;		
		
		return (
			<div className="render-hod">
				<Select2  
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_MPS} 
					placeholder= 'Member of Parliament'
					disabled = {!!selectedMapping.memberOfParliament}
					multiple = {false}
					required = {true}
					key = {1}
					name="memberOfParliament"
					defaultValue = {selectedMapping.memberOfParliament}
					onChange = { (val, data, event) => {

						this.checkSelect2Valid(event);
						
						this.setState({
							memberOfParliament: data
						})
					}}
				/>

				<Select2  
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_ALL_HODS} 
					placeholder= 'HODs'
					multiple = {true}
					ref = 'hodsMp'
					key = {2}
					name="hodsMp"
					required = {true}
					defaultValue = {selectedMapping.hods}					
					onChange = { (val, data, event) => {

						this.checkSelect2Valid(event);

						this.setState({
							hodsMp: val
						})				
						
					}}
				/>

			</div>
		)
	},
	renderHodLiason: function(){

		var {selectedMapping} = this.props;

		return (
			<div className="render-liason">
				<Select2  
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_ALL_HODS} 
					placeholder= 'HODs'
					multiple = {false}
					ref = 'hod'
					name="hod"
					key = {3}
					required = {true}
					defaultValue = {selectedMapping.hod}
					disabled = {!!selectedMapping.id}					
					onChange = { (val, data, event) => {

						this.checkSelect2Valid(event);
						
						this.setState({
							hod: data
						})
						
					}}
				/>

				<Select2  
					url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_ALL_LIASON_OFFICERS} 
					placeholder= 'Liason officers'
					multiple = {true}
					ref = 'liasonOfficers'
					name="liasonOfficers"
					required = {true}					
					key = {4}
					defaultValue = {selectedMapping.liasonOfficers}					
					onChange = { (val, data, event) => {

						this.checkSelect2Valid(event);

						this.setState({
							liasonOfficers: val
						})
						
						
					}}
				/>
			</div>
		)
	},
	render: function(){

		var {
			selectedMapping
		} = this.props;

		var {
			mappingType,
			id
		} = this.state;
		
		var editMode = id? true: false;

		var formContent = null;
		
		switch(parseInt(mappingType)){			
			case 1:				
				formContent = this.renderMpHods();
				break;
			
			case 2:				
				formContent = this.renderHodLiason();
				break;
		}

		return (
			<div className="modal-dialog">
				<div className="modal-dialog-title">
					{editMode? 'Edit mapping': 'Add mapping'}
				</div>
				<form className="modal-dialog-body" ref="form">
					<Select2
						placeholder="Select mapping type"
						className="select2-flushtop"
						disabled = {editMode}
						required = {true}
						value = {mappingType}
						onChange = { (val, data, event)=> {

							this.setState({
								mappingType: val
							})

							this.checkSelect2Valid(event);

						}}
					>
						<option></option>
						<option value="1">MP to HODs</option>
						<option value ="2">HOD to Liason officers</option>
					</Select2>

					{formContent}

					<div className="form-control submit-control">
						<button className="btn btn-primary" onClick = {this.onSave}>Save</button>
						<a onClick = {this.props.closeModal} className="btn btn--unstyled">Cancel</a>
					</div>
				</form>
			</div>
		)
	}
});

module.exports = NewMapping