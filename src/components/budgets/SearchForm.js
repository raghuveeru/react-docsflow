import React from 'react';

var SearchForm = React.createClass({
	render: function(){

		return (
			<div className="sp-card-search sp-search-top">
				<div className="text-wrap">
					<input className="text-input" type="text" placeholder={this.props.placeholder} />
					<button className="btn btn--unstyled">
						<em className="fa fa-search" />
					</button>
				</div>
			</div>
		)
	}
});

module.exports = SearchForm