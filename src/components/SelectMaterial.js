import React from 'react';

var SelectMaterial = React.createClass({	
	componentDidMount: function(){

		if(this.isMounted()){
			$(this.refs.select.getDOMNode())
				.comboSelect()
				.on('change', (event) => {

					this.props.onChange.call(this, event)
				})
		}
	},
	render: function(){

		return (
			<div className='form-control'>				
				<select 
					ref="select" 
					data-theme-class="combo-material" 
					>
					<option value ="">{this.props.label}</option>
					{this.props.children}
				</select>
			</div>
		)
	}
});

module.exports = SelectMaterial;