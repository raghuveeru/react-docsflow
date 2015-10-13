import React from 'react';
import InputMaterial from '../InputMaterial';
import SelectMaterial from '../SelectMaterial';

var NewGroup = React.createClass({
	componentDidMount: function(){

		setTimeout(()=> {				
			this.refs.firstInput.getDOMNode().getElementsByTagName('select')[0].focus()
		}, 0)

	},
	render: function(){
		
		return (
			<div className="modal-dialog">
				<div className="modal-dialog-title">
					Create group
				</div>
				<div className="modal-dialog-body">

					<SelectMaterial ref="firstInput" label="Group type" />
					<InputMaterial  label = 'Name of the group' defaultValue="No idea" />

					
					<div className="form-control">
						<button className="btn btn-primary">Create</button>
						<a className="btn btn--unstyled" onClick = {this.props.closeModal}>Cancel</a>
					</div>
				</div>
			</div>
		)
	}
});


module.exports = NewGroup