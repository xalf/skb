import React from 'react';
import Combobox from './combobox.component';
import { COMBOBOX_SELECT_PLACEHOLDER } from '../combobox.constants';

const ComboboxSelect = (props) => {
	return (
		<Combobox 
			{ ...props }
			placeholder={ COMBOBOX_SELECT_PLACEHOLDER } 
			comboboxTypeClass={ 'combobox--select' }
			isOpenFocus={ true }
			/>
	);
}

export default ComboboxSelect;