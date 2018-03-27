import { combineReducers } from 'redux';
import comboboxReducer from './combobox.reducer';

function createNamedWrapperReducer(reducerFunction, reducerName) {
    return (state, action) => {
        const {name} = action;
        const isInitializationCall = state === undefined;
        if(name && name !== reducerName && !isInitializationCall) return state;
 		
				return reducerFunction(state, action);  
    }
}

export default combineReducers({
	search: createNamedWrapperReducer(comboboxReducer, 'search'),
	select: createNamedWrapperReducer(comboboxReducer, 'select')
});
