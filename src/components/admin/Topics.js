import React from 'react';
import {StoreWatchMixin} from 'fluxxor';
import Modal from 'react-modal';
import NewTopic from './NewTopic';
import {customStyles} from '../../constants';
import TopicList from './TopicList';
import SortableMixin from 'Sortablejs/react-sortable-mixin';


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

		if(!topics.length) return null;
		
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

				<TopicsSortable topics = {topics} {...this.props} />
			</div>
		)
	}
});


var TopicsSortable = React.createClass({
	mixins: [SortableMixin],
	sortableOptions: { 
		model: "maintopics",
		handle: '.drag-handle-main-topic'
	},
	getInitialState: function(){
		return {
			maintopics: this.props.topics
		}
	},
	componentWillReceiveProps: function(nextProps){
		
		this.setState({
			maintopics: nextProps.topics
		})
	},
	handleSort: function (event) {

		this.props.flux.actions.AdminActions.updateMainTopics(this.state.maintopics)
	},
	render: function(){

		var {maintopics} = this.state;

		return (
			<ul className="main-topic-list">
			{maintopics.map((topic, idx) => {

					return <TopicList {...this.props} index = {idx} key = {idx} topic = {topic} {...this.movableProps} />
				})}
			</ul>
		)
	}
});


module.exports = Topics