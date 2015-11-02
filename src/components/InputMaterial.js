import React from 'react';

var InputMaterial = React.createClass({
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
	componentDidUpdate: function(nextProps){
		
		if(nextProps.defaultValue != this.props.defaultValue){			
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
				<input 
					className= { "input-control " + this.props.className}
					ref = 'input'
					type="text" 
					disabled = {this.props.disabled}					
					onFocus = {this.handleOnFocus}
					onBlur = {this.handleOnBlur}
					value = {this.props.defaultValue}
					onInput = {this.props.onChange}
				/>
			</div>
		)
	}
});

module.exports = InputMaterial;