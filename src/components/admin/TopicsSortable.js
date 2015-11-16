import React from 'react';
import TopicList from './TopicList';
import _ from 'lodash';

var sortable = require('react-sortable-mixin');

var TopicsSortable = React.createClass({
	mixins: [sortable.ListMixin],
	onResorted: function(items){
		console.log(items)
	},
	componentDidMount: function(){

		return {
			items: this.props.topics
		}
	},
	componentWillReceiveProps: function(nextProps){
		
		if(!_.isEqual(nextProps, this.props)){

			this.setState({
				items: nextProps.topics
			})
		}

	},
	render: function(){

		var {items} = this.state;

		return (
			<div>
			{items.map((item, idx) => {

					return <TopicList {...this.props} index = {idx} key = {idx} topic = {item} {...this.movableProps} />
				})}
			</div>
		)
	}
});

module.exports = TopicsSortable