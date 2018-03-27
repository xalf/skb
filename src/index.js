import ReactDom from 'react-dom';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import appReducer from './js/reducers';
import App from './js/containers/app';
import mockFull from './kladr.json';
import * as comboboxActions from './js/combobox.actions';

import queryObserverMiddleware from './js/query_observer.middleware';
import './style/style.scss';

const mockShort = mockFull.slice(0, 50);

const mapStateToProps = state => ({
	select: state.select,
	search: state.search
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(comboboxActions, dispatch)
  }
}

const ComboboxConnected = connect(mapStateToProps, mapDispatchToProps)(App);

const initialState = {
	selectedIndex: null,
	selectedItem: null,
	itemsList: [],
	query: '',
	filterQuery: '',
	emptyError: false,
	serverError: false,
	isPending: false
}

const store = createStore(
  appReducer,
  {
  	search: Object.assign({}, initialState, {
  		itemsList: mockFull
  	}),
  	select: Object.assign({}, initialState, {
  		itemsList: mockShort
  	})	
  }
  //applyMiddleware(queryObserverMiddleware)
);

ReactDom.render(
	(
		<Provider store={store}>
	    <ComboboxConnected />
	  </Provider>
	),
	document.getElementById('app-root')
);