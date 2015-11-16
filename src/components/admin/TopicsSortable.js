import React from 'react';
import TopicList from './TopicList';
var sortable = require('react-sortable-mixin');

var TopicsSortable = React.createClass({
	mixins: [sortable.ListMixin],
	onResorted: function(e){
		// console.log(e)
	},
	render: function(){

		var {topics} = this.props;
		
		return (
			<div>
			{topics.map((topic, idx) => {

					return <TopicList {...this.props} index = {idx} key = {idx} topic = {topic} {...this.movableProps} />
				})}
			</div>
		)
	}
});

module.exports = TopicsSortable