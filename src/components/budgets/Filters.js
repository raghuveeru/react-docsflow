import React from 'react';
import {Link} from 'react-router';
import FilterList from './FilterList';

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
					var name = key;
					
					switch(key){
						case 'hodSourcing':
							name = 'HOD Sourcing';
							break;

						case 'hodDrafting':
							name = 'HOD Drafting';
							break;

					}

					var totalCount = 0;
					values.forEach(function(item){
						totalCount+= parseInt(item.count);
					});

					var allActiveClass = !active? 'active': '';					
					var clearBounds = this.onClearFacet.bind(this, key);
					var allHTML = (key != 'year'? 	<a 
									className={allActiveClass}
									onClick = {clearBounds}
									>All {name} ({totalCount})</a>: null)

					return (
						<div className="sp-module" key = {index}>
							<h2 className="sp-module-title">{key}</h2>
							<nav className="nav-sidemenu">
								{allHTML}					
								
								<FilterList 
									values = {values} 
									onChange = {this.onChange}  
									keys = {key} 
									active = {active} />
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