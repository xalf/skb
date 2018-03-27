import {
	SELECT_ITEM,
	CHANGE_QUERY,
	CHANGE_SELECTED_INDEX,
	SEND_SEARCH_REQUEST,
	SEND_SEARCH_REQUEST_ERROR,
	SHOW_SEARCH_RESULTS,
	HIDE_PENDING_INDICATOR,
	SET_INPUT_TEXT,
	LEFT_EMPTY,
	UPDATE_LIST
} from './combobox.constants';

export const selectItem = (item, i, name) => ({
	type: SELECT_ITEM,
	payload: { item, i },
	name: name
});

export const changeQuery = (query, name) => ({
	type: CHANGE_QUERY,
	payload: { query },
	name: name
});

export const updateList = (name) => ({
	type: UPDATE_LIST,
	name: name
});

export const changeSelectedIndex = (i, name) => ({
	type: CHANGE_SELECTED_INDEX,
	payload: { i },
	name: name
});

export const sendSearchRequest = (name) => ({
	type: SEND_SEARCH_REQUEST,
	name: name
});

export const showSearchRequest = (results, name) => ({
	type: SHOW_SEARCH_RESULTS,
	payload: { results },
	name: name
});

export const sendSearchRequestError = (error, name) => ({
	type: SEND_SEARCH_REQUEST_ERROR,
	payload: { error },
	name: name
});

export const hidePendingIndicator = (name) => ({
	type: HIDE_PENDING_INDICATOR,
	name: name
});

export const setInputText = (name) => ({
	type: SET_INPUT_TEXT,
	name: name
});
export const leftEmpty = (name) => ({
	type: LEFT_EMPTY,
	name: name
});