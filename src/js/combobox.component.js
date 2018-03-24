import React from 'react';
import Popover from './popover.component';
import ComboboxInput from './combobox_input.component';
import ComboboxDropdown from './combobox_dropdown.component';

export default class Combobox extends Popover {
    focusHandler = () => { 
  		this.open();
	}
	blurHandler = () => {
		this.close();
	}
  render(){
  	const props = this.props;
  	let inputClasses = [props.comboboxClass];
  	if(props.errors)
  		inputClasses.push('error')

    return (
    	<div>
	    	<div ref={ node => { this.node = node; } }>
	    		<ComboboxInput
	    			classNames={ inputClasses }
	    			placeholder={ props.placeholder }
	    			focusHandler={ props.isOpenFocus && this.focusHandler }
	    			blurHandler={ this.blurHandler } />
	    		{ this.state.isOpen ? (
	    			<ComboboxDropdown
	    				itemsList={ props.itemsList }
	    				renderItem={ props.renderItem }
	    				filterListFn={ props.filterListFn } />
	    		) : null }
	    		
	    	</div>
	    	<div>
	    		errors
	    	</div>
	    </div>
    );
  }
}
