import React from 'react';

var InputFileMaterial = React.createClass({	
	render: function(){

		return (
			<div className='form-control'>				
				<label className="material-file">
					<input type="file" name={this.props.name} multiple={true} />
				</label>
			</div>
		)
	}
});

module.exports = InputFileMaterial;