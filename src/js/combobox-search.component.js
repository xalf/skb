import React from 'react';
import Combobox from './combobox.component';
import Popover from './popover.component';
import { 
	COMBOBOX_SEARCH_PLACEHOLDER,
	COMBOBOX_SEARCH_MAX_ITEMS_COUNT
 } from './combobox.constants';

export default class ComboboxSearch extends Popover {
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
