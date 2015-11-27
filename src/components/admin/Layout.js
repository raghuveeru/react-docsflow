import React from 'react';
import {checkForPermission} from './../../utilities';
import {Link, RouteHandler} from 'react-router';

var Layout = React.createClass({
	contextTypes: {
		router: React.PropTypes.func,
		currentUser: React.PropTypes.object
	},
	componentDidMount: function(){

		if(!checkForPermission(this.context.currentUser, 'canSeeAdminMenu')){
			
			this.context.router.transitionTo('home')
		}
	},
	render: function(){
		
		return (
			<div>
				<h1>Admin</h1>
				<div className="sp-card">
					<nav className="nav-tabs">
						<Link className="tab__handle" to = {'/admin/users'}>Users</Link>
						<Link to = {'/admin/topics'}>Topics</Link>
						<Link to = {'/admin/mapping'}>Mapping</Link>
					</nav>

					<div className="card-body">
						<RouteHandler {...this.props} />
					</div>
				</div>
			</div>
		)
	}
});


module.exports = Layout