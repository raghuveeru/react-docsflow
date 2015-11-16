import React from 'react';

var FilterList = React.createClass({
	onChange: function(key, value){		

		this.props.onChange.call(this, key, value)
	},
	getInitialState: function(){

		return {
			isOpen: false
		}
	},
	toggleShowMore: function(){

		this.setState({
			isOpen: !this.state.isOpen
		})
	},
	render: function(){

		var {values, keys, active} = this.props;
		var maxCount = 5;
		var {isOpen} = this.state;
		
		var showMoreLink = (values.length > maxCount? (isOpen? <a onClick = {this.toggleShowMore}>Show less</a>: <a onClick = {this.toggleShowMore}>Show more</a>): null);

		if(!isOpen && values.length > maxCount){
			values = values.slice(0, maxCount);
		}

		
		return (
			<div>
			{values.map((value, idx) => {

				var bounds = value.count > 0? this.onChange.bind(this, keys, value) : null
				var itemActiveClass = (active == value.name || active == value.id? 'active': '')

				return <a 
					onClick = {bounds} 
					key = {idx}
					className = {itemActiveClass}
					>
					{value.name} ({value.count})
				</a>
			})}
			{showMoreLink}
			</div>
		)
	}
});

module.exports = FilterList