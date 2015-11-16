import React from 'react';
import {StoreWatchMixin} from 'fluxxor';
import Modal from 'react-modal';
import NewTopic from './NewTopic';
import {customStyles} from '../../constants';
import TopicList from './TopicList';
import TopicsSortable from './TopicsSortable';


var Topics = React.createClass({
	mixins: [StoreWatchMixin('AdminStore')],
	getStateFromFlux: function(){

		return {
			AdminStore: this.props.flux.stores.AdminStore.getState(),
			isModalOpen: false,
		}
	},
	contextTypes: {
		router: React.PropTypes.func
	},
	componentDidMount: function(){
		
		this.props.flux.actions.AdminActions.getMainTopics()

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
	render: function(){

		var {topics} = this.state.AdminStore;				
		
		return (
			<div>
				<a className="card-link" onClick = {this.openModal}><em className="fa fa-plus" />Add topic</a>
				<Modal 
					isOpen = {this.state.isModalOpen}
					style={customStyles}
					onRequestClose={this.closeModal}
					>
					<NewTopic {...this.props} closeModal = {this.closeModal} />
				</Modal>

				<TopicsSortable topics = {topics} />
			</div>
		)
	}
});


module.exports = Topics