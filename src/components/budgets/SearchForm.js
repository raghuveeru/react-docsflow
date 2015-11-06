import React from 'react';

var SearchForm = React.createClass({
	render: function(){

		return (
			<div className="sp-card-search sp-search-top">
				<div className="text-wrap">
					<input className="text-input" type="text" placeholder={this.props.placeholder} onChange = {this.props.onChange} defaultValue = {this.props.defaultValue} />
					<button className="btn btn--unstyled" onClick = {this.props.onSubmit}>
						<em className="fa fa-search" />
					</button>
				</div>
				<a className="link-toggle-filter"><i className="fa fa-filter"></i></a>
			</div>
		)
	}
});

module.exports = SearchForm