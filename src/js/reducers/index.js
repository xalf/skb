import comboboxReducer from './combobox.reducer';

export default (state, action) => {
  let new_state;
  if(!!state){
  	new_state = {
  		search:  comboboxReducer(state.search, action),
  		select:  comboboxReducer(state.select, action)
  	}
  } else {
  	new_state = {
  		search: comboboxReducer(state, action),
  		select: comboboxReducer(state, action)
  	}
  }

  return new_state;
}
