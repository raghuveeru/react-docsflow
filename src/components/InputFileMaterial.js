import React from 'react';

var InputFileMaterial = React.createClass({	
	render: function(){

		return (
			<div className='form-control'>				
				<label className="material-file">
					<input type="file" />
				</label>
			</div>
		)
	}
});

module.exports = InputFileMaterial;