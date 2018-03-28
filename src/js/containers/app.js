import React from 'react';
import ComboboxSelect from '../components/combobox-select.component';
import ComboboxSearch from '../components/combobox-search.component';
import FormWrapper from '../components/form_wrapper.component'
import {
	SMALL_INPUT_CLASS,
	LARGE_INPUT_CLASS,
	MEDIUM_INPUT_CLASS,
	COMBOBOX_SEARCH_MAX_ITEMS_COUNT
} from '../combobox.constants';

const renderItem = item => { 
	return (
		<div
			className="">
			{ item.City }
		</div>
	);
};

const filterListFn = (list, query) => {
	if(!query)
		return list;

	const regex = new RegExp(`^${query}`, 'i');
	return list.filter(item => {
			return regex.test(item.City);
	});
}

const addNameInActions = (actions, name) => {
	let newActions = {};
	const keys = Object.keys(actions);

	for(let i in keys){
		const key = keys[i];
		const action = actions[key];

		const decorAction = function () {
			let newArguments = [].slice.call(arguments);
			newArguments.push(name);
			return action.apply(this, newArguments);
		};

		newActions[key] = decorAction;
	}
	return newActions;
}

const App = ({ select, search, actions }) => {
	const selectItemsList = filterListFn(select.itemsList, select.filterQuery)
	const searchItemsList = filterListFn(search.itemsList, search.filterQuery);
	
	const selectActions = addNameInActions(actions, 'select');
	const searchActions = addNameInActions(actions, 'search');
	
	const selectProps = Object.assign({}, select, selectActions);
	const searchProps = Object.assign({}, search, searchActions);

	return (
	  <FormWrapper>
	    <ComboboxSelect
	    	{ ...selectProps }
	    	sizeClass={ MEDIUM_INPUT_CLASS }
	    	renderItem={ renderItem }
	    	itemsList={ selectItemsList } />
	    <ComboboxSearch 
	    	{ ...searchProps } 
	    	sizeClass={ SMALL_INPUT_CLASS }
	    	renderItem={ renderItem }
	    	maxItemsCount={ COMBOBOX_SEARCH_MAX_ITEMS_COUNT }
	    	itemsList={ searchItemsList.slice(0, COMBOBOX_SEARCH_MAX_ITEMS_COUNT) }
	    	itemsListCount={ searchItemsList.length } />
	  </FormWrapper>
	);
}

export default App;