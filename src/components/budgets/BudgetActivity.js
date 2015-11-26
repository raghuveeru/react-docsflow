import React from 'react';
import Modal from 'react-modal';
import {customStyles} from '../../constants';
import Loader from './../Loader';
import Fluxxor, {StoreWatchMixin} from 'fluxxor';
import {getUserRoleName} from './../../utilities';
var FluxMixin = Fluxxor.FluxMixin(React)

var BudgetActivity = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin('BudgetStore')],
	getStateFromFlux: function(){

		return {
			BudgetStore: this.getFlux().store('BudgetStore').getState()
		}
	},
	componentDidMount: function(){
		
		this.getFlux().actions.BudgetActions.getBudgetActivity(this.props.id)		
	},
	render: function(){

		var {activity, isFetchingBudgetActivity} = this.state.BudgetStore;
		
		if(isFetchingBudgetActivity) return <Loader />;

		if(!activity.length) return null;

		return (
			<div className="sp-module">
				<h2 className="sp-module-title">Activity</h2>
				<div className="sp-module-content">
					<ul className="list-items list-user">
						{activity.map((activity, idx) => {


							return (
								<BudgetActivityItem key = {idx} activity = {activity} />
							)
						})}
						
					</ul>
				</div>
			</div>
		)
	}
});


var BudgetActivityItem = React.createClass({
	getInitialState: function(){

		return {
			isModalOpen: false
		}
	},
	viewMessage: function(){

		this.setState({
			isModalOpen: true
		})
	},
	closeModal: function(){
		this.setState({
			isModalOpen: false
		})	
	},
	renderUsers: function(usersArray, prefix){
		if(!usersArray) return null;
		var len = usersArray.length;
		return (
			<span>
				<span>{prefix} </span>
				{usersArray.map( (user, idx) => {
					
					var xtra = (idx != len - 1? ', ': '');
					return (<span><strong>{user.name}</strong>{xtra}</span>)
				})}	
			</span>
		)
	},
	render: function(){

		var {activity} = this.props;
		var fromUser = activity.from;
		var toUser = activity.to;
		
		var image = fromUser.length? fromUser[0].image: null;

		return (
			<li>
				<div className="media-item">
					{image?
						<img src = {image} style = {{width: '40'}} />
					: null}
				</div>
				<div className="media-content">
					{this.renderUsers(fromUser)} {activity.action} {this.renderUsers(toUser)}<strong></strong>

					<div className="activity-meta">
						{activity.date}
						<a className="link-view-message"  onClick = {this.viewMessage}>Message</a>
					</div>
				</div>
				<Modal 
					isOpen = {this.state.isModalOpen}
					style={customStyles}
					onRequestClose={this.closeModal}
					>
					<div className="modal-dialog">
						<div className="modal-dialog-title">
							View Message
						</div>
						<div className="modal-dialog-body">
							<p>{activity.message}</p>

							<a onClick = {this.closeModal}>Close</a>
						</div>
					</div>
				</Modal>
			</li>
		)
	}
})

module.exports = BudgetActivity;