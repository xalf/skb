import React from 'react';

export default class ComboboxInput extends React.Component {
	componentDidMount(){

	}
	render(){
		const {
			classNames,
			placeholder,
			query,
			changeQuery,
			setFocus,
			selectedString,
			isFocus,
			inputRef
		} = this.props;

		let inputBody;
		if(isFocus){
			inputBody =  (
				<input
					type="text"
					placeholder={ placeholder }
					value={ query }
					onChange={ e => { changeQuery(e.target.value); } } />
			);
		} else {
			inputBody = (
				<span>{ selectedString || query }</span>
			);
		}
		return (
			<label
				className={ classNames.join(' ') }
				onClick={ setFocus }
				ref={ inputRef }>
				{ inputBody }
			</label>
		);
	}
	
}
;
