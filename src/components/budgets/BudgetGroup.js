import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';
import {mapObject, getStatusName} from './../../utilities';
import BudgetInnerGroup from './BudgetInnerGroup';

var BudgetGroup = React.createClass({
	
	getInitialState: function(){

		return {
			isOpen: true
		}
	},
	toggleGroup: function(){

		this.setState({
			isOpen: !this.state.isOpen
		})
	},
	render: function(){

		var {group} = this.props;
		var klassName = 'group' + (this.state.isOpen? ' group-open' : ' group-closed');
		
		return (
			<div className={klassName}>
				
				<h3 className="budget-group-title" onClick = {this.toggleGroup}>{group.name} ({group.items.length})</h3>

				{group.items.map( (grp) => {

					return <BudgetInnerGroup grp = {grp}  />
				})}
															
			</div>
		)
	}
});

module.exports = BudgetGroup;