import {
	SELECT_ITEM,
	CHANGE_QUERY,
	CHANGE_SELECTED_INDEX,
	SEND_SEARCH_REQUEST,
	SEND_SEARCH_REQUEST_ERROR,
	SHOW_SEARCH_RESULTS,
	HIDE_PENDING_INDICATOR,
	INPUT_FOCUS,
	LEFT_EMPTY,
	UPDATE_LIST
} from './combobox.constants';

export const selectItem = (item, i) => ({
	type: SELECT_ITEM,
	payload: { item, i }
});

export const changeQuery = (query) => ({
	type: CHANGE_QUERY,
	payload: { query }
});

export const updateList = () => ({
	type: UPDATE_LIST
});

export const changeSelectedIndex = (i) => ({
	type: CHANGE_SELECTED_INDEX,
	payload: { i }
});

export const sendSearchRequest = () => ({
	type: SEND_SEARCH_REQUEST
});

export const showSearchRequest = (results) => ({
	type: SHOW_SEARCH_RESULTS,
	payload: { results }
});

export const sendSearchRequestError = (error) => ({
	type: SEND_SEARCH_REQUEST_ERROR,
	payload: { error }
});

export const hidePendingIndicator = () => ({
	type: HIDE_PENDING_INDICATOR
});

export const inputFocus = () => ({
	type: INPUT_FOCUS
});
export const leftEmpty = () => ({
	type: LEFT_EMPTY
});