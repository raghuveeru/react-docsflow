import React from 'react';
import {Link} from 'react-router';

var Filters = React.createClass({
	render: function(){

		const {facets} = this.props;

		return (
			<div>				
				{mapObject(facets, (key, values) => {

					return (
						<div className="sp-module">
							<h2 className="sp-module-title">{key}</h2>
							<nav className="nav-sidemenu">
								
								{values.map((value) => <a>{value.name} ({value.count})</a>)}
							</nav>
						</div>
					)
				})}
			</div>
		)
	}
});

function mapObject(object, callback) {
	return Object.keys(object).map(function (key) {
		return callback(key, object[key]);
	});
}


module.exports = Filters