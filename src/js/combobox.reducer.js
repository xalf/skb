import {
	SELECT_ITEM,
	CHANGE_QUERY,
	SEND_SEARCH_REQUEST,
	SHOW_SEARCH_RESULTS,
	HIDE_PENDING_INDICATOR,
	INPUT_FOCUS,
	LEFT_EMPTY,
	EMPTY_ERROR,
	CHANGE_SELECTED_INDEX,
	SEND_SEARCH_REQUEST_ERROR
} from './combobox.constants';


const getComboboxReducer = (itemsList, itemToString) => {

	const initialState = {
		selectedIndex: null,
		selectedItem: null,
		itemsList: itemsList || [],
		query: '',
		filterQuery: '',
		emptyError: false,
		serverError: false,
		isPending: false
	}
	const comboboxReducer = (state = initialState, action) => {
		switch (action.type) {
			case SELECT_ITEM: {
				return {
					...state,
					selectedItem: action.payload.item,
					selectedIndex: action.payload.i,
					query: itemToString(action.payload.item),
					emptyError: false
				}
			}
			case CHANGE_QUERY: {
				return {
					...state,
					selectedItem: null,
					query: action.payload.query,
					filterQuery: action.payload.query,
					selectedIndex: action.payload.query ? 0 : null
				}
			}
			case CHANGE_SELECTED_INDEX: {
				return {
					...state,
					selectedIndex: action.payload.i
				}
			}
			case INPUT_FOCUS: {
				let queryUpdate = state.query;
				if(state.selectedItem)
					queryUpdate = itemToString(state.selectedItem)
				return {
					...state,
					query: queryUpdate
				}
			}
			case LEFT_EMPTY: {
				return {
					...state,
					emptyError: !state.selectedItem ? EMPTY_ERROR : false
				}
			}
			case SEND_SEARCH_REQUEST: {
				return {
					...state,
					isPending: true
				}
			}
			case SEND_SEARCH_REQUEST_ERROR : {
				return {
					...state,
					serverError: action.payload.error
				}
			}
			case SHOW_SEARCH_RESULTS: {
				return {
					...state,
					serverError: false,
					itemsList: action.payload.results
				}
			}
			case HIDE_PENDING_INDICATOR: {
				return {
					...state,
					isPending: false
				}
			}
			default:
	      return state;
		}
	}

	return comboboxReducer;
}



export default getComboboxReducer;