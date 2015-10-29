import React from 'react';

var Select2 = React.createClass({
	componentDidMount: function(){

		var select = this.refs.select.getDOMNode();

		$(select).select2({
			data:{ text: "name" },
			placeholder: this.props.placeholder,
			multiple: this.props.multiple || false,
			ajax: {
				url: this.props.url,
				dataType: 'json',
				data: function (term, page) {
		            return {
		                q: term, // search term
		            };
		        },
		        results: function (data, page) { 
		        	
            		return { results: data.data };
        		},        		
        		cache: true
			}			
		})
		.on('change', (event) => {

			this.props.onChange && this.props.onChange.call(this, event.val)
		})
	},
	render: function(){

		return (
			<div className="select2-element">
				<input type="text" ref="select" />
			</div>
		)
	}
});

module.exports = Select2;