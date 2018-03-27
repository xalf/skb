import React from 'react';
import ComboboxSelect from '../components/combobox-select.component';
import ComboboxSearch from '../components/combobox-search.component';import {
	SMALL_INPUT_CLASS,
	LARGE_INPUT_CLASS,
	MEDIUM_INPUT_CLASS
} from '../combobox.constants';

const renderItem = item => { 
	return (
		<div
			className="">
			{ item.City }
		</div>
	);
};

const filterListFn = query => {
	if(!query)
		return () => (true);

	const regex = new RegExp(`^${query}`, 'i');
	return item => {
		return regex.test(item.City);
	}
}

const App = ({ select, search, actions }) => {
	let selectItemsList = select.itemsList.filter(filterListFn(select.filterQuery));
	let searchItemsList = search.itemsList.filter(filterListFn(search.filterQuery));
	const selectProps = Object.assign({}, select, actions, selectItemsList);
	const searchProps = Object.assign({}, search, actions, searchItemsList);

	return (
	  <div>
	    <ComboboxSelect
	    	{ ...selectProps }
	    	sizeClass={ MEDIUM_INPUT_CLASS }
	    	renderItem={ renderItem } />
	    <div></div>
	    <ComboboxSearch 
	    	{ ...searchProps } 
	    	sizeClass={ SMALL_INPUT_CLASS }
	    	renderItem={ renderItem } />
	  </div>
	);
}

export default App;