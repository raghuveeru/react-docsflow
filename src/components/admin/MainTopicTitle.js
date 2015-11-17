import React from 'react';
import Modal from 'react-modal';
import NewTopic from './NewTopic';
import {customStyles} from '../../constants';

var MainTopicTitle = React.createClass({
	onEditMainTopic: function(id, event){

		event.stopPropagation();

		this.setState({
			isModalOpen: true
		})
	},
	getInitialState: function(){
		return {
			isModalOpen: false
		}
	},
	closeModal: function(){
		
		this.setState({
			isModalOpen: false
		})
	},
	openModal: function(){
		
		this.setState({
			isModalOpen: true
		})
	},
	deleteTopic: function(event){

		event.stopPropagation();

		var {topic} = this.props;

		if(confirm('Are you sure you want to delete?')){

			this.props.flux.actions.AdminActions.deleteTopic({
				topicId: topic.id
			})
		}

	},
	render: function(){

		var {topic} = this.props;

		return (
			<div>				
				<h3 
					className="budget-group-title"
					onClick = {this.props.toggleGroup}>
					<span className="drag-handle-main-topic topic-drag-handle fa fa-bars"></span>
					{topic.name}

					<div className="topic-cell-actions">
						<a onClick = {this.onEditMainTopic.bind(this, topic.id)}>Edit</a>
						<a onClick = {this.deleteTopic}>Delete</a>
					</div>
				</h3>
				<Modal 
					isOpen = {this.state.isModalOpen}
					style={customStyles}
					onRequestClose={this.closeModal}
					>
					<NewTopic {...this.props} 
						closeModal = {this.closeModal} 
						title="Edit topic" 
						buttonTitle = 'Save' 
						topic = {topic} 
					/>
				</Modal>
			</div>
		)
	}
});

module.exports = MainTopicTitle;