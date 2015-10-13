import React from 'react';
import {StoreWatchMixin} from 'fluxxor';
import Modal from 'react-modal';
import NewGroup from './NewGroup';
import {customStyles} from '../../constants';

var Groups = React.createClass({
	mixins: [StoreWatchMixin('GroupStore')],
	getStateFromFlux: function(){

		return {
			GroupStore: this.props.flux.stores.GroupStore.getState(),
			isModalOpen: false,
		}
	},
	contextTypes: {
		router: React.PropTypes.func
	},
	componentDidMount: function(){
		this.props.flux.actions.AdminActions.getGroups()
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
		
		return (
			<div>
				<a onClick = {this.openModal}>Add new group</a>
				<Modal 
					isOpen = {this.state.isModalOpen}
					style={customStyles}
					onRequestClose={this.closeModal}
					>
					<NewGroup closeModal = {this.closeModal} />
				</Modal>
				<table className="table">
					<thead>
						<tr>
							<th>User details</th>
							<th>Account permissions </th>
							<th className="cell-actions"></th>
						</tr>
					</thead>
					<tbody>
						{this.state.GroupStore.groups.map((user) => {

							return (
								<tr>
									<td>{user.name}</td>
									<td>{user.designation}</td>
									<td>
										<a href="#">Edit</a>
										<a href="#">Delete</a>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		)
	}
});


module.exports = Groups