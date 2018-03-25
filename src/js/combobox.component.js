import React from 'react';
import ComboboxInput from './combobox_input.component';
import ComboboxDropdown from './combobox_dropdown.component';

const compareArrays = (a1, a2) => {
    return a1.length == a2.length && a1.every((v,i)=>v === a2[i])
}

export default class Combobox extends React.Component {
  state = {
  	isInputFocus: false,
  	isDropdownOpen: false
  }
	focus = () => {
		if(this.props.isOpenFocus)
			this.open();

		this.props.inputFocus();

		this.setState({
			isInputFocus: true
		});
	}
	blur = () => {
		const {
			query,
			itemToString,
			selectedIndex,
			itemsList,
			selectedItem,
			selectItem
		} = this.props;

		if(!selectedItem && itemsList.length == 1 && 
			query === itemToString(itemsList[selectedIndex]))
			selectItem(itemsList[selectedIndex], selectedIndex);
		else if(!selectedItem)
			this.props.leftEmpty();

		this.setState({
			isInputFocus: false
		});
	}
	close = () => {
    document.removeEventListener('click', this.handleOutsideClick, true);

    this.setState({
      isDropdownOpen: false
    });
  }
  open(){
    document.addEventListener('click', this.handleOutsideClick, true);

    this.setState({
      isDropdownOpen: true
    });
  }

  toggleOpen = e => {
    e.stopPropagation();
    
    this.state.isDropdownOpen ? this.close() : this.open();
  }
	handleOutsideClick = e => {
    if (this.combobox_node && this.combobox_node.contains(e.target)) {
    	if(this.input_node && this.input_node.contains(e.target))
    		return;
    	else {
    		this.blur();
    		return;
    	}
    }
      
    this.blur();
    this.toggleOpen(e);
  }
	selectItem = (item, i)=> {
		this.props.selectItem(item, i);
		this.close();
		this.blur();
	}
	changeQuery= query => {
		this.props.changeQuery(query);

		!this.state.isDropdownOpen && this.open();
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.itemsList.length === 0 && this.props.selectedIndex !== null)
			this.props.changeSelectedIndex(null);
	}
  render(){
  	const {
  		placeholder,
  		itemToString,
  		query,
  		changeSelectedIndex,
  		selectedIndex,
  		selectedItem,
  		itemsList,
  		renderItem,
  		isPending,
  		emptyError,
  		errors,
  		comboboxTypeClass,
  		sizeClass
  	} = this.props;
  	const {
  		isInputFocus,
  		isDropdownOpen
  	} = this.state;

  	let inputClasses = ["combobox__input", sizeClass];
  	if(errors)
  		inputClasses.push('error')

    return (
    	<div className="combobox__wrapper">
	    	<div
	    		ref={ node => { this.combobox_node = node; } }
	    		className={ `combobox ${ comboboxTypeClass }`}>
	    		<ComboboxInput
	    			inputRef={ node => { this.input_node = node; } }
	    			classNames={ inputClasses }
	    			placeholder={ placeholder }
	    			setFocus={ this.focus }
	    			isFocus={ isInputFocus }
	    			changeQuery={ this.changeQuery }
	    			query={ query }
	    			selectedString={ itemToString(selectedItem) } />
    			<ComboboxDropdown
    				itemsList={ itemsList }
    				renderItem={ renderItem }
    				isPending={ isPending }
    				selectItem={ this.selectItem }
    				isOpen={ isDropdownOpen }
    				selectedIndex={ selectedIndex }
    				changeSelectedIndex={ changeSelectedIndex }
    				close={ this.close } />
	    		
	    	</div>
	    	{ emptyError ? (
	    		<div className="combobox__error-block">
		    		{ emptyError }
		    	</div>
	    	) : null }
	    </div>
    );
  }
}
