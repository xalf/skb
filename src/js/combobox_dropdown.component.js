import React from 'react';
import Loader from './loader.component';
import ComboboxListItem from './combobox_listitem.component';
import {
	KEY_CODE_ENTER,
	KEY_CODE_ESC,
	KEY_CODE_UP,
	KEY_CODE_DOWN
} from './combobox.constants';


export default class ComboboxDropdown extends React.Component {
	
  //блокирование скроллинга
  
  navigateDown = () => {
  	const { 
  		itemsList, 
  		changeSelectedIndex,
  		selectedIndex
  	} = this.props;

  	const newSelectedIndex = selectedIndex === null ? 0 : selectedIndex + 1;
  	if(newSelectedIndex < itemsList.length)
  		changeSelectedIndex(newSelectedIndex);
  }
  navigateUp = () => {
  	const {  
  		changeSelectedIndex,
  		selectedIndex
  	} = this.props;

  	const newSelectedIndex = selectedIndex - 1;
  	if(newSelectedIndex >= 0)
  		changeSelectedIndex(newSelectedIndex);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }
  onKeyDown = event => {
    if (!this.props.isOpen) {
      return;
    }

    if ([KEY_CODE_ESC, KEY_CODE_ENTER].includes(event.keyCode)) {
      event.preventDefault();
      event.stopPropagation();
    }
    if([KEY_CODE_UP, KEY_CODE_DOWN].includes(event.keyCode))
      if(this.props.itemsList.length > 1){
        event.preventDefault();
        event.stopPropagation();
      } else
        return;


    switch (event.keyCode) {
      case KEY_CODE_DOWN:
        this.navigateDown();
        break;
      case KEY_CODE_UP:
        this.navigateUp();
        break;
      case KEY_CODE_ENTER:
        if (this.props.selectedIndex !== null) {
          this.props.selectItem( 
          	this.props.itemsList[this.props.selectedIndex],
            this.props.selectedIndex
          );
        } 
        break;
      case KEY_CODE_ESC:
        this.props.close();
        break;
    }
  };
  render(){
  	const {
  		isOpen,
  		itemsList
  	} = this.props;

  	let list;
  	if(itemsList.length > 0){
  		list = itemsList
	  		.map((item,i) => {
	  			let isActive = false;
	  			if(i === this.props.selectedIndex)
	  				isActive = true;

		  		return (
		  			<ComboboxListItem
		  				key={ i }
		  				isActive={ isActive }
		  				clickHandler={ () => { this.props.selectItem(item, i); } }>
		  				{ this.props.renderItem(item) }
		  			</ComboboxListItem>
		  		);
		  	});
  	} else {
  		list = (
  			<p className="combobox__empty">Не найдено</p>
  		)
  	}
  	

    return (
    	<div className={ `combobox__dropdown ${ isOpen ? '' : 'hide' }` }>
    		{ list }
    	</div>
    );
  }
}
