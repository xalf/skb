import React from 'react';
import Combobox from './combobox.component';
import { 
	COMBOBOX_SEARCH_PLACEHOLDER
 } from '../combobox.constants';

export default class ComboboxSearch extends React.Component {
	render(){
		return (
			<Combobox
				{ ...this.props }
				placeholder={ COMBOBOX_SEARCH_PLACEHOLDER }
				comboboxClass={ 'combobox--search' }
				comboboxName={ 'search' } />
		);
	}
}
