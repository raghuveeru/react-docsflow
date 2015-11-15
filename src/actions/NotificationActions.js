import {actions} from '../constants';
import request from 'superagent';
import NProgress from 'react-nprogress';
import {headers} from './../constants';

module.exports = {
	addNotification: function(payload){

		this.dispatch(actions.ADD_NOTIFICATION, payload);
	}
}