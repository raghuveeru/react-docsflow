import React from 'react';
import InputMaterial from '../InputMaterial';
import {validationOptions} from './../../constants';

var BudgetCutTopicForm = React.createClass({
	getInitialState: function(){

		var {budgetCutTopic} = this.props;

		return {
			budgetCutTopicName: budgetCutTopic? budgetCutTopic.name : ''
		}
	},
	getDefaultProps: function(){

		return {
			budgetCutTopic: null,
			buttonTitle: 'Add budget cut topic'
		}
	},
	onSave: function(event){
		
		if(this.$form.valid()){

			event && event.preventDefault();

			var {budgetCutTopic, topic} = this.props;

			if(budgetCutTopic){
				// Edit form 
				
				this.props.flux.actions.AdminActions.editBudgetCutTopic({
					name: this.state.budgetCutTopicName,
					topicId: topic.id,
					id: budgetCutTopic.id,
					userId: CURRENT_USER.id
				})			

			}else{

				this.props.flux.actions.AdminActions.createBudgetCutTopic({
					name: this.state.budgetCutTopicName,
					topicId: topic.id,
					userId: CURRENT_USER.id
				})
			}

			this.setState({
				budgetCutTopicName: ''
			});
			
			this.props.toggleAdd.call(this)

		}

	},
	componentDidMount: function(){
		this.refs.firstInput.getDOMNode().getElementsByTagName('input')[0].focus()

		this.$form = $(this.refs.form.getDOMNode());

		this.$form.validate(validationOptions);
	},
	render: function(){
		
		return (
			<form className="section-form" ref = "form" onSub>
				<InputMaterial
					label="Budget Cut Topic name"
					name="topicName"
					ref = "firstInput"
					value = {this.state.budgetCutTopicName}
					required = {true}
					onChange = { (event)=> {
						this.setState({
							budgetCutTopicName: event.target.value
						})
					}}
				/>

				<div className="form-control submit-control">
					<button className="btn btn-primary" onClick = {this.onSave}>{this.props.buttonTitle}</button>
					<a className="btn btn--unstyled" onClick = {this.props.toggleAdd}>Cancel</a>
				</div>
			</form>
		)
	}
});

module.exports = BudgetCutTopicForm;