import React from 'react';

var SelectMaterial = React.createClass({	
	render: function(){

		return (
			<div className='form-control'>				
				<select>
					<option value ="">{this.props.label}</option>
					<option>adas</option>
				</select>
			</div>
		)
	}
});

module.exports = SelectMaterial;