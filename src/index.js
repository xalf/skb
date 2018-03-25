import ReactDom from 'react-dom';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import ComboboxSelect from './js/combobox-select.component';
import ComboboxSearch from './js/combobox-search.component';
import mockFull from './kladr.json';
import getComboboxReducer from './js/combobox.reducer';
import {
	selectItem,
	changeQuery,
	changeSelectedIndex,
	sendSearchRequest,
	showSearchRequest,
	hidePendingIndicator,
	inputFocus,
	leftEmpty
} from './js/combobox.actions';
import {
	SMALL_INPUT_CLASS,
	LARGE_INPUT_CLASS
} from './js/combobox.constants';
import queryObserverMiddleware from './js/query_observer.middleware';
import './style/style.scss';

const mockShort = mockFull.slice(0, 50);

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

const itemToString = item => {
	if(item)
		return item.City;
}

const mapStateToProps = state => {
	return {
		query: state.query,
		selectedItem: state.selectedItem,
		selectedIndex: state.selectedIndex,
		itemsList: state.itemsList.filter(filterListFn(state.filterQuery)),
		emptyError: state.emptyError,
		isPending: state.isPending
	}
}
const mapDispatchToProps = {
	selectItem,
	changeQuery,
	changeSelectedIndex,
	sendSearchRequest,
	showSearchRequest,
	hidePendingIndicator,
	inputFocus,
	leftEmpty
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	return Object.assign({}, ownProps, dispatchProps, stateProps, {
		renderItem: renderItem,
		itemToString: itemToString,
		sizeClass: LARGE_INPUT_CLASS
	})
}

const ComboboxConnected = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ComboboxSelect);

const store = createStore(
  getComboboxReducer(mockShort, itemToString)
  //applyMiddleware(queryObserverMiddleware)
);

const App = () => (
  <Provider store={store}>
    <ComboboxConnected />
  </Provider>
);

ReactDom.render(
	<App />,
	document.getElementById('app-root')
);