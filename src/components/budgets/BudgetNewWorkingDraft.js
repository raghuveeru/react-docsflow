import React from 'react';
import InputMaterial from '../InputMaterial';
import SelectMaterial from '../SelectMaterial';
import InputFileMaterial from '../InputFileMaterial';
import Fluxxor from 'fluxxor';
var FluxMixin = Fluxxor.FluxMixin(React)

var BudgetNewWorkingDraft = React.createClass({	
	mixins: [FluxMixin],
	getInitialState: function(){
		return {
			isOpen: this.props.editMode? true : false
		}
	},
	toggle: function(){

		if(this.isMounted()){
			this.setState({
				isOpen: !this.state.isOpen
			})
		}
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
				
				this.getFlux().actions.BudgetDetailActions.addWorkingDraft(data, this.toggle)

				this.props.onFinishEdit && this.props.onFinishEdit.call(this)
			}
		})
	},
	render: function(){

		var {isOpen} = this.state;
		var {editMode, workingDraft} = this.props;
		var sectionClass = 'section-form' + (isOpen? '' : ' js-hide');
		var link = !isOpen? <a className="link-add" onClick = {this.toggle}>Add working draft details </a>: null;
		var currentDraft = {
			attachments: []
		};
		var heading = editMode? 'Edit working draft details': 'Add working draft details';
		if(editMode) currentDraft = workingDraft[0];		

		return (
			<form ref="ajaxForm" method = 'post' action = {AppConfig.API.BASE_URL + AppConfig.API.BUDGET.CREATE_NEW_WORKING_DRAFT}>
				{link}

				<input type = "hidden" name="userId" value = {CURRENT_USER.id} />
				<input type = "hidden" name="budgetCutId" value = {this.props.budgetCutId} />

				<div className={sectionClass}>
					<h4>{heading}</h4>
					
					<InputFileMaterial
						name="attachments"
					 />

					 {currentDraft.attachments.map((attachment, index) => {
						return (
							<a href={attachment.downloadUrl} key = {index}>
								{attachment.fileName}
							</a>
						)
					})}
					
					<div className="form-control submit-control">
						<button className="btn btn-primary">Save</button>
						<a className="btn btn--unstyled" onClick = {this.cancelForm}>Cancel</a>
					</div>
				</div>
			</form>
		)
	}
});

module.exports = BudgetNewWorkingDraft;