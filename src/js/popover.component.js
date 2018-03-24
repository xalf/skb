import React, { Component } from 'react';

export default class Popover extends Component {
  state = {
    isOpen: false
  };

  close(){
    document.removeEventListener('click', this.handleOutsideClick, true);

    this.setState({
      isOpen: false
    });
  }
  open(){
    document.addEventListener('click', this.handleOutsideClick, true);

    this.setState({
      isOpen: true
    });
  }

  toggle = e => {
    e.stopPropagation();
    
    this.state.isOpen ? this.close() : this.open();
  }

  handleOutsideClick = e => {
    if (this.node && this.node.contains(e.target)) 
      return;

    this.toggle(e);
  }
  componentWillUnmount(){
    if(this.state.is_open)
      this.close_popover();
  }
}
