import React from 'react';
import Navigation from './Navigation';
import {RouteHandler} from 'react-router';
import Fluxxor, {StoreWatchMixin} from 'fluxxor';
import NotificationSystem from 'react-notification-system';


var FluxMixin = Fluxxor.FluxMixin(React);

var Main = React.createClass({
	mixins: [FluxMixin],
	componentDidMount: function() {
		
		this._notificationSystem = this.refs.notificationSystem;

		
		this.props.flux.store('NotificationStore')
			.on("add", (payload) => {
				
				this._notificationSystem.addNotification(payload);

			});
	},	
	render: function(){
		
		return (
			<div>
				<Navigation />				
				<div className="main-content">
					<div className="container">
						
						<RouteHandler {...this.props} />
					</div>
					<NotificationSystem ref="notificationSystem" allowHTML = {true} />
 				</div>
			</div>
		)
	}
});


module.exports = Main