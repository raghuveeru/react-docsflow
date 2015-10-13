import React from 'react';

var NewUser = React.createClass({		
	render: function(){
		
		return (
			<div className="modal-dialog">
				<div className="modal-dialog-title">
					Add user
				</div>
				<div className="modal-dialog-body">

					<a onClick = {this.props.closeModal}>Cancel</a>
				</div>
			</div>
		)
	}
});


module.exports = NewUser