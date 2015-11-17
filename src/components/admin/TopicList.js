import React from 'react';
import MainTopicTitle from './MainTopicTitle';
import BudgetCutTopicItem from './BudgetCutTopicItem';
import BudgetCutTopicForm from './BudgetCutTopicForm';

var TopicList = React.createClass({	
	getInitialState: function(){

		return {
			isOpen: true,
			showAdd: false
		}
	},
	toggleGroup: function(){

		this.setState({
			isOpen: !this.state.isOpen
		})
	},
	toggleAdd: function(){

		this.setState({
			showAdd: !this.state.showAdd
		})
	},	
	render: function(){

		var klassName = 'group group-admin-topic' + (this.state.isOpen? ' group-open' : ' group-closed');
		var {topic} = this.props;
		var {showAdd} = this.state;

		return (
			<div className={klassName}>				
				<MainTopicTitle 
					topic = {topic} 
					toggleGroup = {this.toggleGroup}
					{...this.props}
				/>
				<div className="budget-list-item">
					{topic.budgetCutTopic.map((child, idx) => {

						return (
							<BudgetCutTopicItem {...this.props} key = {idx} budgetCutTopic = {child} />
						)
					})}
					{this.state.showAdd? <BudgetCutTopicForm 
						{...this.props} 
						toggleAdd = {this.toggleAdd} 
						topic = {topic} 
						/>: <a onClick = {this.toggleAdd}>Add budget cut topic</a>}
				</div>
			</div>
		)
	}
});

module.exports = TopicList