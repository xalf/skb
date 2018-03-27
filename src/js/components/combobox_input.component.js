import React from 'react';

export default class ComboboxInput extends React.Component {
	componentDidMount(){

	}
	render(){
		const {
			placeholder,
			query,
			changeQuery,
			setFocus,
			selectedString,
			isFocus,
			isError,
			sizeClass,
			inputRef
		} = this.props;

		let inputBody;
		if(isFocus){
			inputBody =  (
				<input
					type="text"
					className="text-input__input"
					placeholder={ placeholder }
					value={ query }
					onChange={ e => { changeQuery(e.target.value); } } />
			);
		} else {
			if(selectedString || query)
				inputBody = (
					<span className="text-input__value">{ selectedString || query }</span>
				);
			else
				inputBody = (
					<span className="text-input__placeholder">{ placeholder }</span>
				);
		}

		let classList = ['text-input', sizeClass];
		if(isFocus)
			classList.push('focus');
		else {
			if(isError)
				classList.push('error');
		}


		return (
			<label
				className={ classList.join(' ') }
				onClick={ setFocus }
				ref={ inputRef }>
				{ inputBody }
			</label>
		);
	}
	
}
;
