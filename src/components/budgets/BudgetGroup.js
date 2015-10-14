import React from 'react';

var BudgetGroup = React.createClass({
	getInitialState: function(){

		return {
			isOpen: true
		}
	},
	toggleGroup: function(){

		this.setState({
			isOpen: !this.state.isOpen
		})
	},
	render: function(){

		var {group} = this.props;
		var klassName = 'group' + (this.state.isOpen? ' group-open' : ' group-closed');

		return (
			<div className={klassName}>
				<a onClick = {this.toggleGroup}>Toggle Group</a>
				<h3>{group.name}</h3>
											
				{group.items.map((item, index) => {
					
					return (
						<div key = {index}>
							<input type="checkbox" />
							<h4>{item.title}</h4>
							<p>{item.summary}</p>

							<table>
								<tbody>
									<tr>
										<th>Member of Parliament</th>
										<td>{item.memberOfParliament}</td>
									</tr>
									<tr>
										<th>HOD Sourcing</th>
										<td>{item.hodSourcing}</td>
									</tr>
									<tr>
										<th>HOD Drafting</th>
										<td>{item.hodDrafting}</td>
									</tr>
								</tbody>
							</table>
					</div>)
				})}
			</div>
		)
	}
});

module.exports = BudgetGroup;