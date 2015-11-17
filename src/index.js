import React from 'react';
import Router from 'react-router';
import routes from './routes';
import Fluxxor from 'fluxxor';
import stores from './stores';
import actions from './actions';

import Notifications from './components/Notifications';

var flux = new Fluxxor.Flux(stores, actions);

/**
 * Logging for Flux Store
 * @param  {[type]} type
 * @param  {[type]} payload) 
 */
flux.on("dispatch", function(type, payload) {
	if (console && console.log) {
		console.log("[Dispatch]", type, payload);
	}
});

$(function(){

	Router.run(routes, function(Handler) {
	  React.render(
	    <Handler flux = {flux} />,
	    document.getElementById("root")
	  );
	});


	/**
	 * Render notifications
	 */
	
	React.render(<Notifications flux = {flux} />, document.getElementById('momster-notification'))
});