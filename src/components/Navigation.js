import React from 'react';
import {Link} from 'react-router';

var Navigation = React.createClass({
	render: function(){

		return (
			<div className="nav-wrapper">
				<div className="container">
					<ul className="nav-list">
						<li>
							<a href="#/">Home</a>
						</li>
						<li>
							<Link to={'/budgets/new'}>Create new budget cut</Link>
						</li>
						<li>
							<Link to={'/admin'}>Admin</Link>
						</li>
					</ul>
				</div>
			</div>
		)
	}
});


module.exports = Navigation