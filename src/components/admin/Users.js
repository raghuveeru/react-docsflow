import React from 'react';
import {StoreWatchMixin} from 'fluxxor';
import Modal from 'react-modal';
import NewUser from './NewUser';
import {customStyles} from '../../constants';
import {getUserRoleName} from './../../utilities';

var Users = React.createClass({
	mixins: [StoreWatchMixin('AdminStore')],
	getStateFromFlux: function(){

		return {
			AdminStore: this.props.flux.stores.AdminStore.getState(),
			isUserModalOpen: false,
			selectedUser: {}
		}
	},
	contextTypes: {
		router: React.PropTypes.func
	},
	componentDidMount: function(){
		this.props.flux.actions.AdminActions.getUsersAdmin()
	},
	closeModal: function(){
		
		this.setState({
			isUserModalOpen: false
		})
	},
	openUserModal: function(event){		

		event && event.stopPropagation();
		
		this.setState({
			selectedUser: {},
			isUserModalOpen: true
		})
	},
	deleteUser: function(userId, type, event){

		event && event.preventDefault();
		
		if(confirm('Are you sure you want to delete?')){

			this.props.flux.actions.AdminActions.deleteUser({
				id: userId,
				type: type,
				userId: CURRENT_USER.id
			})
		}

	},
	editUser: function(userId, type, event){

		this.props.flux.actions.AdminActions.getUserById({
			id: userId,
			type: type
		}, (response) => {
			
			var _user = response.data[0];

			this.setState({
				selectedUser: _user,
				isUserModalOpen: true
			})
		})

	},
	render: function(){		

		var {isUserModalOpen, selectedUser} = this.state;
		var {users} = this.state.AdminStore;
		
		return (
			<div>	
				<a className="card-link" onClick = {this.openUserModal}><em className='fa fa-plus' />Add user</a>				
				<Modal 
					isOpen = {isUserModalOpen}
					style={customStyles}
					onRequestClose={this.closeModal}
					>
					<NewUser {...this.props} closeModal = {this.closeModal} selectedUser = {selectedUser} />
				</Modal>
				<table className="table table-admin">
					<thead>
						<tr>
							<th colSpan="2">User details</th>
							<th>Department</th>
							<th>Account permissions </th>
							<th className="cell-actions"></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, idx) => {

							var deleteFn = this.deleteUser.bind(this, user.id, user.type || 'user');

							var editFn = this.editUser.bind(this, user.id, user.type || 'user');

							return (
								<tr key = {idx}>
									<td className="cell-image">
										<img src={user.image} style = {{width: 40}} />
									</td>									
									<td>
										{user.name}
										<span className="user-role-designation">{user.designation}</span>
									</td>
									<td>
										{user.department}
									</td>
									<td>
										{getUserRoleName(user.role)}										
									</td>
									<td className="cell-actions">
										
										<a className="link-edit" onClick = {editFn}>Edit</a>
										<a className="link-delete" onClick = {deleteFn}>Delete</a>
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