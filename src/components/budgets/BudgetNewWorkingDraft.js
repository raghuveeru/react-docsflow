import React from 'react';
import InputMaterial from '../InputMaterial';
import InputFileMaterial from '../InputFileMaterial';
import Fluxxor from 'fluxxor';
import Attachments from './Attachments';
import {emitNotification} from './../../utilities';
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

				if(data.errors){

					var errs = data.errors.map((data) => data.error);

					/* Emit error notification */

					emitNotification('error', this.getFlux(), errs.join('<br />'))

				}else{

					/* Emit success notification */

					emitNotification('success', this.getFlux(), this.props.editMode? 'Working draft details successfully updated.' : 'Working draft details successfull added.');

					this.getFlux().actions.BudgetDetailActions.addWorkingDraft(data, this.toggle)

					this.props.onFinishEdit && this.props.onFinishEdit.call(this)

				}
							
			},
			error: (data) => {				

				/* Emit error notification */

				emitNotification('error', this.getFlux(), data.responseText)
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
		
		var url = AppConfig.API.BASE_URL + AppConfig.API.BUDGET.CREATE_NEW_WORKING_DRAFT;
		if(editMode) {
			currentDraft = workingDraft[0];		
			url = AppConfig.API.BASE_URL + AppConfig.API.BUDGET.EDIT_WORKING_DRAFT;
		}

		return (
			<form ref="ajaxForm" method = 'post' action = {url}>
				{link}

				<input type = "hidden" name="userId" value = {CURRENT_USER.id} />
				<input type = "hidden" name="budgetCutId" value = {this.props.budgetCutId} />

				<div className={sectionClass}>
					<h4>{heading}</h4>
					
					<InputFileMaterial
						name="attachments"
					 />

					 <Attachments attachments = {currentDraft.attachments} budgetCutId = {this.props.budgetCutId} type = 'workingDraftDetails' />
					
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