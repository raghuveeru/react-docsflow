import React from 'react';
import Navigation from './Navigation';
import {RouteHandler} from 'react-router';
import Fluxxor from 'fluxxor';

var FluxMixin = Fluxxor.FluxMixin(React)

var Main = React.createClass({
	mixins: [FluxMixin],
	render: function(){
		
		return (
			<div>
				<Navigation />
				<div className="main-content">
					<div className="container">
						
						<RouteHandler {...this.props} />
					</div>
				</div>
			</div>
		)
	}
});


module.exports = Main