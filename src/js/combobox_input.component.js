import React from 'react';

const ComboboxInput = ({
	classNames,
	placeholder,
	searchQuery,
	selectValue,
	changeQuery,
	focusHandler,
	blurHandler
}) => (
	<input
		type="text"
		className={ classNames.join(',') }
		placeholder={ placeholder }
		value={ selectValue || searchQuery }
		onChange={ e => { changeQuery(e.target.value); } }
		onFocus={ focusHandler }
		onBlur={ blurHandler } />
);

export default ComboboxInput;