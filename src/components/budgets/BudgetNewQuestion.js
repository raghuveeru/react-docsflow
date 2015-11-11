import React from 'react';
import InputMaterial from '../InputMaterial';
import InputFileMaterial from '../InputFileMaterial';
import TextareaMaterial from '../TextareaMaterial';
import Attachments from './Attachments';
import Select2 from '../Select2';
import Fluxxor from 'fluxxor';
var FluxMixin = Fluxxor.FluxMixin(React)

var BudgetNewQuestion = React.createClass({	
	mixins: [FluxMixin],
	getInitialState: function(){
		return {
			isOpen: this.props.editMode? true : false
		}
	},
	toggle: function(){

		this.setState({
			isOpen: !this.state.isOpen
		})
	},
	cancelForm: function(){

		this.setState({
			isOpen: false
		})	

		this.props.onCancelForm && this.props.onCancelForm.call(this)
	},
	componentDidMount: function(){

		var $form = $(this.refs.ajaxForm.getDOMNode());

		$form.ajaxForm({
			dataType: 'json',
			success: (data) => {
				
				this.getFlux().actions.BudgetDetailActions.addQuestion(data, this.toggle)

				this.props.onFinishEdit && this.props.onFinishEdit.call(this)
			}
		})
	},	
	render: function(){
		
		var {isOpen} = this.state;
		var {editMode, question} = this.props;
		var sectionClass = 'section-form' + (isOpen? '' : ' js-hide');
		var currentQuestion = {
			hodDrafting: {},
			liasonOfficer: {}
			,attachments: [],
		};
		var link = !isOpen? <a className="link-add" onClick = {this.toggle}>Add question details </a>: null;

		var heading = editMode? 'Edit question details': 'Add question details';

		var url = AppConfig.API.BASE_URL + AppConfig.API.BUDGET.CREATE_NEW_QUESTION;

		if(editMode) {
			currentQuestion = question[0];		
			url = AppConfig.API.BASE_URL + AppConfig.API.BUDGET.EDIT_QUESTION;
		}

		return (
			<form ref="ajaxForm" method = 'post' action = {url}>
				{link}

				<input type = "hidden" name="userId" value = {CURRENT_USER.id} />
				<input type = "hidden" name="budgetCutId" value = {this.props.budgetCutId} />

				<div className={sectionClass}>
					<h4>{heading}</h4>
					<TextareaMaterial
						rows = {1} 
						label = "Details of question sourced" 
						name="details"
						defaultValue = {currentQuestion.details}
					/>

					<InputFileMaterial 
						name="attachments"
						/>
					<Attachments attachments = {currentQuestion.attachments} budgetCutId = {this.props.budgetCutId} />					

					<Select2  
							url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_HOD_DRAFTING_USER} 
							placeholder= 'HOD drafting reply'
							multiple = {false}
							name = 'hodDrafting'
							defaultValue = {currentQuestion.hodDrafting}
							onChange = { (val) => {
								
								
							}}
						/>

					<Select2  
							url = {AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_ALL_LIASON_OFFICERS} 
							placeholder= 'Liason officer'
							multiple = {false}
							name = 'liasonOfficer'
							defaultValue = {currentQuestion.liasonOfficer}
							onChange = { (val) => {
								
								
							}}
						/>

					
					<div className="form-control submit-control">
						<button className="btn btn-primary">Save</button>
						<a className="btn btn--unstyled" onClick = {this.cancelForm}>Cancel</a>
					</div>
				</div>
			</form>
		)
	}
});

module.exports = BudgetNewQuestion;