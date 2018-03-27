import React from 'react';
import {
	KEY_CODE_TAB
} from '../combobox.constants';

export default class FormWrapper extends React.Component {
	state = {
		focusIndex: null
	};
	toggleFocus = index => {
		return flag => {
			if(flag && this.state.focusIndex !== index)
				this.setState({
					focusIndex: index
				});
			else if(!flag && this.state.focusIndex === index)
				this.setState({
					focusIndex: null
				});
		}
	} 
	nextFocus = (index = null) => {
		let newIndex = index !== null ? index + 1 : 0;
		const fieldsCount = React.Children.count(this.props.children);
		if(newIndex < fieldsCount)
			this.setState({
				focusIndex: newIndex
			});
		else 
			this.setState({
				focusIndex: null
			});
	}
	onKeyDown =event => {
		if(event.keyCode !== KEY_CODE_TAB)
			return;
	
		event.preventDefault();
    event.stopPropagation();

    this.nextFocus(this.state.focusIndex);
	}
	componentDidMount(){
		window.addEventListener('keydown', this.onKeyDown);
	}
	componentWillUnmount(){
		window.removeEventListener('keydown', this.onKeyDown);
	}
	render(){
		const children = React.Children.map(this.props.children, (child, i) => {
			return React.cloneElement(child, {
				isFocus: this.state.focusIndex === i,
				nextFocus: () => { this.nextFocus(i); },
				toggleFocus: this.toggleFocus(i)
			});
		});
		return (
			<div>
				{ children }
			</div>
		);
	}
}