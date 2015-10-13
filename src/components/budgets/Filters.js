import React from 'react';
import {Link} from 'react-router';

var Filters = React.createClass({
	render: function(){

		return (
			<div>
				<div className="sp-module">
					<h2 className="sp-module-title">Topics</h2>
					<nav className="nav-sidemenu">
						<a href="#">All types</a>
					</nav>
				</div>
			</div>
		)
	}
});


module.exports = Filters