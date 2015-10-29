import React from 'react';
import InputMaterial from '../InputMaterial';
import SelectMaterial from '../SelectMaterial';
import InputFileMaterial from '../InputFileMaterial';

var BudgetNewQuestion = React.createClass({	
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
		var link = !isOpen? <a className="link-add" onClick = {this.toggle}>Add question details </a>: null;

		return (
			<div>
				{link}

				<div className={sectionClass}>
					<h4>Add question details</h4>
					<InputMaterial label = "Details of question sourced" />

					<InputFileMaterial />


					<SelectMaterial label="HOD drafting reply">
					</SelectMaterial>
					<SelectMaterial label="Liason officer">						
					</SelectMaterial>

					<div className="form-control submit-control">
						<button className="btn btn-primary">Save</button>
						<a className="btn btn--unstyled" onClick = {this.toggle}>Cancel</a>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = BudgetNewQuestion;