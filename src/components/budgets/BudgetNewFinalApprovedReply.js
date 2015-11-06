import React from 'react';
import InputMaterial from '../InputMaterial';
import InputFileMaterial from '../InputFileMaterial';
import Fluxxor from 'fluxxor';
var FluxMixin = Fluxxor.FluxMixin(React)

var BudgetNewFinalApprovedReply = React.createClass({	
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
	componentDidMount: function(){

		var $form = $(this.refs.ajaxForm.getDOMNode());

		$form.ajaxForm({
			dataType: 'json',
			success: (data) => {
				
				this.getFlux().actions.BudgetDetailActions.addFinalApprovedReply(data, this.toggle)

				this.props.onFinishEdit && this.props.onFinishEdit.call(this)
			}
		})
	},
	render: function(){

		var {isOpen} = this.state;
		var {editMode, finalApprovedReply} = this.props;
		var sectionClass = 'section-form' + (isOpen? '' : ' js-hide');
		var link = !isOpen? <a className="link-add" onClick = {this.toggle}>Add final approved reply details </a>: null;

		var currentReply = {
			attachments: [],
			types: []
		};
		var heading = editMode? 'Edit working draft details': 'Add working draft details';
		
		var url = AppConfig.API.BASE_URL + AppConfig.API.BUDGET.CREATE_NEW_FINAL_APPROVED_REPLY;

		if(editMode) {
			currentReply = finalApprovedReply[0];	

			url = AppConfig.API.BASE_URL + AppConfig.API.BUDGET.EDIT_FINAL_APPROVED_REPLY	
		}

		return (
			<form ref="ajaxForm" method = 'post' action = {url}>
				{link}

				<input type = "hidden" name="userId" value = {CURRENT_USER.id} />
				<input type = "hidden" name="budgetCutId" value = {this.props.budgetCutId} />

				<div className={sectionClass}>
					<h4>Add final approved reply details</h4>
					
					<InputFileMaterial name="attachments" />			

					{currentReply.attachments.map((attachment, index) => {
						return (
							<a href={attachment.downloadUrl} key = {index}>
								{attachment.fileName}
							</a>
						)
					})}

					<div className="form-control">
						<label>
							Types of reply uploaded
						</label>
						{AppConfig.APPROVED_REPLY_TYPES.map((reply, idx) => {

							var isChecked = currentReply.types.indexOf(reply) != -1;

							return <label key = {idx} className="label-checkbox label-block">
								<input type='checkbox' name="types[]" value={reply} defaultChecked = {isChecked} />
								{reply}
								</label>
						})}
					</div>
					
					<div className="form-control submit-control">
						<button className="btn btn-primary">Save</button>
						<a className="btn btn--unstyled" onClick = {this.toggle}>Cancel</a>
					</div>
				</div>
			</form>
		)
	}
});

module.exports = BudgetNewFinalApprovedReply;