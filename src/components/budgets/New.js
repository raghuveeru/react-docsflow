import React from 'react';
import InputMaterial from '../InputMaterial';
import SelectMaterial from '../SelectMaterial';

var BudgetNew = React.createClass({
	render: function(){

		return (
			<div>
				<h1>Create new budget cut</h1>
				<div className="sp-card">
					<div className="card-body">

						<SelectMaterial label="Topics" />

						<SelectMaterial label="Budget cut topic" />

						<SelectMaterial label="Member of Parliament" />

						<SelectMaterial label="Source HOD" />

						<InputMaterial label = "File reference no. (optional)" />

						<InputMaterial label = "Gist of cuts" />

						<InputMaterial label = "Time for MP to speak (min)" />


						<div className="form-control">
							<h4>Assign to officer</h4>

							<SelectMaterial label="Select action" />

							<InputMaterial label = "Responsible officers" />
							<InputMaterial label = "Officers to notify" />
							<InputMaterial label = "Message" />

							<div className="form-control">
								<button className="btn btn-primary">Create</button>
								<a className="btn btn--unstyled">Cancel</a>
							</div>
						</div>

					</div>
				</div>
			</div>
		)
	}
})

module.exports = BudgetNew