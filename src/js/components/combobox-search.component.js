import React from 'react';
import Combobox from './combobox.component';
import { 
	COMBOBOX_SEARCH_PLACEHOLDER,
	COMBOBOX_SEARCH_MAX_ITEMS_COUNT
 } from '../combobox.constants';

export default class ComboboxSearch extends React.Component {
	render(){
		return (
			<Combobox
				{ ...this.props }
				placeholder={ COMBOBOX_SEARCH_PLACEHOLDER }
				comboboxClass={ 'combobox--search' }
				maxItemsCount={ COMBOBOX_SEARCH_MAX_ITEMS_COUNT } />
		);
	}
}