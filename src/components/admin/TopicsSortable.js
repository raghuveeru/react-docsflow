import React from 'react';
import TopicList from './TopicList';
import _ from 'lodash';

var TopicsSortable = React.createClass({		
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