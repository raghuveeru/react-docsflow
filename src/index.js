import React from 'react';
import Router from 'react-router';
import routes from './routes';
import Fluxxor from 'fluxxor';
import stores from './stores';
import actions from './actions';

import request from 'superagent';
import {headers} from './constants';

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

/**
 * Render notifications
 */

React.render(<Notifications flux = {flux} />, document.getElementById('momster-notification'))

/**
 * Run the APP only after Role id is obtained
 */

window.INITIALIZE_MOMSTER_COS = function(){

	request
		.get(AppConfig.API.BASE_URL + AppConfig.API.USERS.GET_USER_ROLE)
		.set(headers)
		.query({
			'userId': CURRENT_USER.id
		})
		.end((err, res) => {
			if(res.ok){
				var userData = JSON.parse(res.text);

				window.CURRENT_USER.roleId = userData.data[0].roleId;
				window.CURRENT_USER.name = userData.data[0].name;
			

				Router.run(routes, function(Handler) {
				  React.render(
				    <Handler flux = {flux} />,
				    document.getElementById("root")
				  );
				});

			}
		})
};