import React from 'react';
import {Link} from 'react-router';

var Filters = React.createClass({
	onChange: function(facet, value){

		this.props.onChange.call(this, facet, value)
	},
	onClearFacet: function(facet){
		this.props.onClearFacet.call(this, facet)
	},
	render: function(){

		const {facets} = this.props;

		return (
			<div>				
				{mapObject(facets, (key, values, index) => {

					var active = this.props.selected[key];

					var totalCount = 0;
					values.forEach(function(item){
						totalCount+= parseInt(item.count);
					});

					var allActiveClass = !active? 'active': '';					
					var clearBounds = this.onClearFacet.bind(this, key);
					var allHTML = (key != 'year'? <a 
									className={allActiveClass}
									onClick = {clearBounds}
									>All {key} ({totalCount})</a>: null)

					return (
						<div className="sp-module" key = {index}>
							<h2 className="sp-module-title">{key}</h2>
							<nav className="nav-sidemenu">
								{allHTML}					
								{values.map((value, idx) => {

									var bounds = value.count > 0? this.onChange.bind(this, key, value) : null
									var itemActiveClass = (active == value.name || active == value.id? 'active': '')

									return <a 
										onClick = {bounds} 
										key = {idx}
										className = {itemActiveClass}
										>
										{value.name} ({value.count})
									</a>
								})}
							</nav>
						</div>
					)
				})}
			</div>
		)
	}
});

function mapObject(object, callback) {
	return Object.keys(object).map(function (key, idx) {
		return callback(key, object[key], idx);
	});
}


module.exports = Filters