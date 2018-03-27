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
  inputClick = () => {
		if(!this.props.isFocus)
			this.props.toggleFocus(true);
		else if(!this.state.isInputFocus)
			this.focusInput();
  }
	focusInput = () => {
		this.props.setInputText();

		this.setState({
			isInputFocus: true
		});
	}
	blurInput = () => {
		this.setState({
			isInputFocus: false
		});
	}
	closeDropdown = () => {
    this.setState({
      isDropdownOpen: false
    });
  }
  openDropdown(){
    this.setState({
      isDropdownOpen: true
    });
  }
	handleClick = e => {
    if (this.combobox_node && this.combobox_node.contains(e.target)) {
    	if(this.input_node && this.input_node.contains(e.target))
    		this.focusInput();
    	else 
    		this.blurInput();
    	return;
    }

    if(this.state.isDropdownOpen)
      e.stopPropagation();

    this.blur();
  }
	selectItemByEnter = (item, i)=> {
		this.props.selectItem(item, i);
		this.props.nextFocus();
	}
	selectItemByClick = (item, i)=> {
		this.props.selectItem(item, i);
		this.closeDropdown();
	}
	changeQuery= query => {
		this.props.changeQuery(query);

		!this.state.isDropdownOpen && this.openDropdown();
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.itemsList.length === 0 && nextProps.selectedIndex !== null)
			this.props.changeSelectedIndex(null);

		if(nextProps.isFocus && !this.props.isFocus)
			this.focus();
		else if(!nextProps.isFocus && this.props.isFocus)
			this.blur();
	}
	focus = () => {
		document.addEventListener('click', this.handleClick, true);

		this.focusInput();

		if(this.props.isOpenFocus)
			this.openDropdown();
	}
	blur = () => {
		const {
			query,
			selectedIndex,
			itemsList,
			selectedItem,
			selectItem,
			leftEmpty,
			toggleFocus
		} = this.props;

		document.removeEventListener('click', this.handleClick, true);
		toggleFocus(false);

		this.blurInput();
		if(this.state.isDropdownOpen)
			this.closeDropdown();

		if(!selectedItem && itemsList.length == 1 && 
			query === itemsList[selectedIndex].City)
			selectItem(itemsList[selectedIndex], selectedIndex);
		else if(!selectedItem)
			leftEmpty();
	}
	componentDidMount(){
		if(this.props.isFocus)
			this.focus();
	}
	componentWillUnmount(){
		if(this.props.isFocus)
			this.blur();
	}
  render(){
  	const {
  		placeholder,
  		query,
  		changeSelectedIndex,
  		selectedIndex,
  		selectedItem,
  		itemsList,
  		renderItem,
  		isPending,
  		emptyError,
  		serverError,
  		errors,
  		comboboxTypeClass,
  		sizeClass,
  		updateList,
  		maxItemsCount,
  		itemsListCount,
  		isFocus
  	} = this.props;
  	const {
  		isInputFocus,
  		isDropdownOpen
  	} = this.state;

    return (
    	<div className="combobox__wrapper">
	    	<div
	    		ref={ node => { this.combobox_node = node; } }
	    		className={ `combobox ${ comboboxTypeClass }`}>
	    		<ComboboxInput
	    			inputRef={ node => { this.input_node = node; } }
	    			placeholder={ placeholder }
	    			setFocus={ this.inputClick }
	    			isFocus={ isInputFocus }
	    			isError={ !!emptyError }
	    			sizeClass={ sizeClass }
	    			changeQuery={ this.changeQuery }
	    			query={ query }
	    			selectedString={ selectedItem ? selectedItem.City : false } />
    			{ isDropdownOpen ? (
    				<ComboboxDropdown
	    				itemsList={ itemsList }
	    				renderItem={ renderItem }
	    				serverError={ serverError }
	    				isPending={ isPending }
	    				selectItemByEnter={ this.selectItemByEnter }
	    				selectItemByClick={ this.selectItemByClick }
	    				selectedIndex={ selectedIndex }
	    				changeSelectedIndex={ changeSelectedIndex }
	    				close={ this.closeDropdown } 
	    				updateList={ updateList }
	    				maxItemsCount={ maxItemsCount }
	    				itemsListCount={ itemsListCount }/>
    			) : null }
	    	</div>
	    	{ emptyError && !isFocus ? (
	    		<div className="combobox__error-block">
		    		{ emptyError }
		    	</div>
	    	) : null }
	    </div>
    );
  }
}
