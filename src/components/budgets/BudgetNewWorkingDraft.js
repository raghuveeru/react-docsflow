import React from 'react';
import InputMaterial from '../InputMaterial';
import SelectMaterial from '../SelectMaterial';
import InputFileMaterial from '../InputFileMaterial';

var BudgetNewWorkingDraft = React.createClass({	
	getInitialState: function(){
		return {
			isOpen: false
		}
	},
	toggle: function(){

		this.setState({
			isOpen: !this.state.isOpen
		})
	},
	render: function(){

		var {isOpen} = this.state;

		var sectionClass = 'section-form' + (isOpen? '' : ' js-hide');
		var link = !isOpen? <a className="link-add" onClick = {this.toggle}>Add working draft details </a>: null;

		return (
			<div>
				{link}

				<div className={sectionClass}>
					<h4>Add working draft details</h4>
					
					<InputFileMaterial />


					
					<div className="form-control submit-control">
						<button className="btn btn-primary">Save</button>
						<a className="btn btn--unstyled" onClick = {this.toggle}>Cancel</a>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = BudgetNewWorkingDraft;