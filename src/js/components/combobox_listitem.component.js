import React from 'react';

export default class ComboboxListItem extends React.Component {
	render(){
		return (
			<div
				className={ `combobox__listitem ${ this.props.isActive ? 'active' : '' }` }
				onClick={ this.props.clickHandler }>
				{ this.props.children }
			</div>
		);
	}
}