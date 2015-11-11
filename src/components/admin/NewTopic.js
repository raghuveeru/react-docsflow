import React from 'react';
import InputMaterial from '../InputMaterial';
import Fluxxor from 'fluxxor';

var FluxMixin = Fluxxor.FluxMixin(React);

var NewTopic = React.createClass({
	mixins: [FluxMixin],
	getInitialState: function(){
		var {topic} = this.props;

		return {
			topicName: topic? topic.name: '',
			userId: CURRENT_USER.id
		}
	},
	componentDidMount: function(){

		setTimeout(()=> {				
			this.refs.firstInput.getDOMNode().getElementsByTagName('input')[0].focus()
		}, 0)

	},
	onSave: function(event){
		
		event && event.preventDefault();

		/**
		 * Check if there is topic prop (Edit more)
		 */
		
		if(this.props.topic){

			this.getFlux().actions.AdminActions.editMainTopic({
				topicId: this.props.topic.id,
				topicName: this.state.topicName,
				userId: CURRENT_USER.id
			})

		}else{
		
			this.getFlux().actions.AdminActions.createMainTopic(this.state)
		}

		this.props.closeModal.call(this)

	},
	getDefaultProps: function(){

		return {
			title: 'Create new topic',
			buttonTitle: 'Create'
		}
	},
	render: function(){

		var {topic} = this.props;

		var topic_id = topic? topic.id: null,
			topic_name = topic? topic.name: '';
		
		return (
			<div className="modal-dialog">
				<div className="modal-dialog-title">
					{this.props.title}
				</div>
				<form className="modal-dialog-body" onSubmit = {this.onSave}>
					{topic? <input type="hidden" name = 'topicId' value = {topic_id} /> : null}
					<InputMaterial  
						ref = "firstInput"
						label = 'Name of the topic' 
						defaultValue = {topic_name}
						onChange = { (event) => {
							this.setState({
								topicName: event.target.value
							})
						}}
						 />
						
					<div className="form-control">
						<button className="btn btn-primary" onClick = {this.onSave}>{this.props.buttonTitle}</button>
						<a className="btn btn--unstyled" onClick = {this.props.closeModal}>Cancel</a>
					</div>
				</form>
			</div>
		)
	}
});


module.exports = NewTopic