import React from 'react';
import {StoreWatchMixin} from 'fluxxor';
import Modal from 'react-modal';
import NewUser from './NewUser';
import {customStyles} from '../../constants';

var Users = React.createClass({
	mixins: [StoreWatchMixin('UserStore')],
	getStateFromFlux: function(){

		return {
			UserStore: this.props.flux.stores.UserStore.getState(),
			isModalOpen: false,
		}
	},
	contextTypes: {
		router: React.PropTypes.func
	},
	componentDidMount: function(){
		this.props.flux.actions.AdminActions.getUsers()
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
				<a className="card-link" onClick = {this.openModal}>
					<em className="fa fa-plus" />
					Add user
				</a><br />
				<a onClick = {this.openModal}>Add new MP</a><br />
				<a onClick = {this.openModal}>Add new HOD</a><br />
				<a onClick = {this.openModal}>Add new MP and HOD Linkage</a><br />
				<a onClick = {this.openModal}>Add new HOD and Liason Officer Linkage</a><br />
				<Modal 
					isOpen = {this.state.isModalOpen}
					style={customStyles}
					onRequestClose={this.closeModal}
					>
					<NewUser closeModal = {this.closeModal} />
				</Modal>
				<table className="table table-admin">
					<thead>
						<tr>
							<th colSpan="2">User details</th>
							<th>Account permissions </th>
							<th className="cell-actions"></th>
						</tr>
					</thead>
					<tbody>
						{this.state.UserStore.users.map((user, idx) => {

							return (
								<tr key = {idx}>
									<td className="cell-image">
										<img src={user.image} />
									</td>
									<td>{user.name}</td>
									<td>{user.designation}</td>
									<td className="cell-actions">
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


module.exports = Users