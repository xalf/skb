import {
	SELECT_ITEM,
	CHANGE_QUERY,
	SEND_SEARCH_REQUEST,
	SHOW_SEARCH_RESULTS,
	HIDE_PENDING_INDICATOR,
	INPUT_FOCUS,
	LEFT_EMPTY,
	EMPTY_ERROR,
	CHANGE_SELECTED_INDEX
} from './combobox.constants';


const getComboboxReducer = (itemsList, itemToString) => {

	const initialState = {
		selectedIndex: null,
		selectedItem: null,
		itemsList: itemsList || [],
		query: '',
		filterQuery: '',
		emptyError: false,
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
					emptyError: EMPTY_ERROR
				}
			}
			case SEND_SEARCH_REQUEST: {
				return {
					...state
				}
			}
			case SHOW_SEARCH_RESULTS: {
				return {
					...state
				}
			}
			case HIDE_PENDING_INDICATOR: {
				return {
					...state
				}
			}
			default:
	      return state;
		}
	}

	return comboboxReducer;
}



export default getComboboxReducer;