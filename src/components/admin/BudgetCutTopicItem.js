import React from 'react';
import BudgetCutTopicForm from './BudgetCutTopicForm';

var BudgetCutTopicItem = React.createClass({
	getInitialState: function(){

		return {
			isEditing: false
		}
	},
	toggleEdit: function(){

		this.setState({
			isEditing: !this.state.isEditing
		})
	},
	onDelete: function(){
		
		var {budgetCutTopic, topic} = this.props

		if(confirm('Are you sure you want to delete?')){
			
			this.props.flux.actions.AdminActions.deleteBudgetCutTopic({
				topicId: topic.id,
				budgetCutTopicId: budgetCutTopic.id,
				userId: CURRENT_USER.id
			})
			
		}
	},
	render: function(){

		var {budgetCutTopic, topic, disableSort} = this.props;
		var {isEditing} = this.state;
		
		return (
			<li className="budget-list-subitem">			
				<span className="drag-handle topic-drag-handle fa fa-bars"></span>
				<span>{budgetCutTopic.name}</span>
				{isEditing? <BudgetCutTopicForm
					{...this.props}
					topic = {topic}
					toggleAdd = {this.toggleEdit}
					budgetCutTopic = {budgetCutTopic}
					buttonTitle = 'Save'
				/> : null}
				
				{disableSort? null: <div className="topic-cell-actions">
					<a onClick = {this.toggleEdit}>Edit</a>
					<a onClick = {this.onDelete}>Delete</a>
				</div>}
			</li>
		)
	}
});

module.exports = BudgetCutTopicItem