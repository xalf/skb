import React from 'react';
import Loader from './loader.component';
import ComboboxListItem from './combobox_listitem.component';
import {
	KEY_CODE_ENTER,
	KEY_CODE_ESC,
	KEY_CODE_UP,
	KEY_CODE_DOWN
} from '../combobox.constants';
import { Scrollbars } from 'react-custom-scrollbars';

export default class ComboboxDropdown extends React.Component {
	
  //блокирование скроллинга, скроллбар
  
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
    // if (!this.props.isOpen) {
    //   return;
    // }

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
  		itemsList,
      serverError,
      isPending,
      updateList
  	} = this.props;

  	let dropdownBody;
    if(isPending)
      dropdownBody = (
        <Loader />
      );
    else if(serverError)
      dropdownBody = (
        <div className="combobox__server-error">
          <p>
            { serverError }
          </p>
          <button 
            className="combobox__update"
            onClick={ updateList }>
            Обновить
          </button>
        </div>
      );
    else if(itemsList.length > 0){
      const list = itemsList
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
        dropdownBody = (
          <Scrollbars
            style={{ height: 345, width: 340 }}
            renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}>
            { list }
          </Scrollbars>
        );
    } else {
      dropdownBody = (
        <p className="combobox__empty">Не найдено</p>
      );
    }
  	
    return (
    	<div className='combobox__dropdown'>
    		{ dropdownBody }
    	</div>
    );
  }
}
