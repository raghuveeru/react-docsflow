import React from 'react';

var TextareaMaterial = React.createClass({
	getInitialState: function(){

		return {
			isFocused: false,
			hasValue: false,
		}
	},
	handleOnFocus: function(){

		this.setState({
			isFocused: true,			
		})
	},
	handleOnBlur: function(event){
		
		this.setState({
			isFocused: false,
			hasValue: event.target.value == ''? false: true,
		})
	},
	componentDidMount: function(){

		if(this.props.defaultValue){
			this.setState({
				hasValue: true
			})
		}
	},
	render: function(){

		var {isFocused, hasValue} = this.state;

		var klass = 'form-control' + ((hasValue)? ' label-active' : '') + (isFocused? ' label-up': '');

		return (
			<div className={klass}>
				<label 
					className='label-control'					
					>{this.props.label}</label>
				<textarea 
					className="input-control" 					
					onFocus = {this.handleOnFocus}
					onBlur = {this.handleOnBlur}
					defaultValue = {this.props.defaultValue}
					rows={this.props.rows}
					onChange = {this.props.onChange}
				>
				</textarea>
			</div>
		)
	}
});

module.exports = TextareaMaterial;