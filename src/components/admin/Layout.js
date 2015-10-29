import React from 'react';
import {Link, RouteHandler} from 'react-router';

var Layout = React.createClass({	
	render: function(){
		
		return (
			<div>
				<h1>Admin</h1>
				<div className="sp-card">
					<nav className="nav-tabs">
						<Link className="tab__handle" to = {'/admin/users'}>Users</Link>
						<Link to = {'/admin/topics'}>Topics</Link>
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