import React from 'react';

var Select2 = React.createClass({
	getDefaultProps: function(){

		return {
			multiple: false,
			allowClear: false
		}
	},
	componentDidMount: function(){

		var select = this.refs.select.getDOMNode();

		var options = {			
			placeholder: this.props.placeholder,
			allowClear: this.props.allowClear,
		};

		if(this.props.url){
			
			options = Object.assign({}, options, {
				data:{ text: "name" },
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
			});
		}

		var $select = $(select).select2(options)
			.on('change', (event) => {

				this.props.onChange && this.props.onChange.call(this, event.val, $select.select2('data'))
			})
	},
	render: function(){

		if(!this.props.url){

			return (
				<div className="select2-element">
					<select ref= "select">
						{this.props.children}
					</select>
				</div>
			)
		}
		
		return (
			<div className="select2-element">
				<input type="text" ref="select" />
			</div>
		)
	}
});

module.exports = Select2;